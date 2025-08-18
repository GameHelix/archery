import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'

export interface ConversionProgress {
  progress: number
  time: string
  speed: string
}

export interface ConversionSettings {
  quality: 'high' | 'medium' | 'low'
  fps: number
  optimization: 'size' | 'quality' | 'balanced'
}

class FFmpegConverter {
  private ffmpeg: FFmpeg | null = null
  private isLoaded = false

  async load(onProgress?: (progress: number) => void): Promise<void> {
    if (this.isLoaded) return

    this.ffmpeg = new FFmpeg()
    
    this.ffmpeg.on('log', ({ message }) => {
      console.log('[FFmpeg]', message)
    })

    this.ffmpeg.on('progress', ({ progress }) => {
      onProgress?.(progress * 100)
    })

    try {
      // Use the correct CDN paths for FFmpeg.js
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
      
      console.log('Loading FFmpeg from:', baseURL)
      
      await this.ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      })

      this.isLoaded = true
      console.log('FFmpeg loaded successfully')
    } catch (error) {
      console.error('Failed to load FFmpeg:', error)
      this.isLoaded = false
      throw new Error(`FFmpeg loading failed: ${error}`)
    }
  }

  async convertGifToMp4(
    file: File,
    settings: ConversionSettings,
    onProgress?: (progress: ConversionProgress) => void
  ): Promise<{ blob: Blob; size: number }> {
    if (!this.ffmpeg || !this.isLoaded) {
      throw new Error('FFmpeg not loaded')
    }

    const inputName = 'input.gif'
    const outputName = 'output.mp4'

    // Write input file
    const fileData = new Uint8Array(await file.arrayBuffer())
    await this.ffmpeg.writeFile(inputName, fileData)

    // Build FFmpeg command based on settings
    const args = this.buildFFmpegArgs(inputName, outputName, settings)

    // Track progress
    let lastProgress = 0
    this.ffmpeg.on('progress', ({ progress, time }) => {
      const currentProgress = Math.round(progress * 100)
      if (currentProgress > lastProgress) {
        lastProgress = currentProgress
        onProgress?.({
          progress: currentProgress,
          time: time.toString(),
          speed: '1x'
        })
      }
    })

    // Execute conversion
    await this.ffmpeg.exec(args)

    // Read output file
    const data = await this.ffmpeg.readFile(outputName)
    // FFmpeg readFile returns Uint8Array, convert to proper format for Blob
    const blob = new Blob([data as BlobPart], { type: 'video/mp4' })

    // Cleanup
    await this.ffmpeg.deleteFile(inputName)
    await this.ffmpeg.deleteFile(outputName)

    return { blob, size: blob.size }
  }

  private buildFFmpegArgs(
    inputName: string,
    outputName: string,
    settings: ConversionSettings
  ): string[] {
    const args = ['-i', inputName]

    // Set frame rate
    args.push('-r', settings.fps.toString())

    // Set video codec and quality
    args.push('-c:v', 'libx264')

    // Quality settings
    switch (settings.quality) {
      case 'high':
        args.push('-crf', '18')
        break
      case 'medium':
        args.push('-crf', '23')
        break
      case 'low':
        args.push('-crf', '28')
        break
    }

    // Optimization settings
    switch (settings.optimization) {
      case 'size':
        args.push('-preset', 'slow', '-profile:v', 'baseline')
        break
      case 'quality':
        args.push('-preset', 'slower', '-profile:v', 'high')
        break
      case 'balanced':
        args.push('-preset', 'medium', '-profile:v', 'main')
        break
    }

    // Pixel format for compatibility
    args.push('-pix_fmt', 'yuv420p')

    // Remove audio (GIFs don't have audio)
    args.push('-an')

    // Overwrite output file
    args.push('-y')

    args.push(outputName)

    return args
  }

  async terminate(): Promise<void> {
    if (this.ffmpeg) {
      await this.ffmpeg.terminate()
      this.ffmpeg = null
      this.isLoaded = false
    }
  }
}

// Singleton instance
export const ffmpegConverter = new FFmpegConverter()