'use client'

import { useState, useCallback, useEffect } from 'react'
import { FileText, Copy, Check, RefreshCw, Settings, Shuffle } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type GenerationType = 'words' | 'sentences' | 'paragraphs'

export default function LoremGeneratorPage() {
  const [generatedText, setGeneratedText] = useState('')
  const [generationType, setGenerationType] = useState<GenerationType>('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
    'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
    'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'sunt', 'explicabo',
    'nemo', 'ipsam', 'voluptatem', 'quia', 'voluptas', 'aspernatur', 'aut',
    'odit', 'fugit', 'sed', 'quia', 'consequuntur', 'magni', 'dolores', 'ratione',
    'sequi', 'nesciunt', 'neque', 'porro', 'quisquam', 'est', 'qui', 'dolorem',
    'adipisci', 'velit', 'numquam', 'eius', 'modi', 'tempora', 'incidunt'
  ]

  const getRandomWords = (num: number): string[] => {
    const words = []
    for (let i = 0; i < num; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
    }
    return words
  }

  const generateSentence = (minWords = 5, maxWords = 15): string => {
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
    const words = getRandomWords(wordCount)
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(' ') + '.'
  }

  const generateParagraph = (minSentences = 3, maxSentences = 8): string => {
    const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences
    const sentences = []
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence())
    }
    return sentences.join(' ')
  }

  const generateText = useCallback(() => {
    setIsGenerating(true)
    setCopied(false)

    setTimeout(() => {
      let result = ''

      switch (generationType) {
        case 'words':
          const words = getRandomWords(count)
          if (startWithLorem && count > 0) {
            words[0] = 'Lorem'
            if (count > 1) words[1] = 'ipsum'
          }
          result = words.join(' ')
          break

        case 'sentences':
          const sentences = []
          for (let i = 0; i < count; i++) {
            sentences.push(generateSentence())
          }
          if (startWithLorem && sentences.length > 0) {
            sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          }
          result = sentences.join(' ')
          break

        case 'paragraphs':
          const paragraphs = []
          for (let i = 0; i < count; i++) {
            paragraphs.push(generateParagraph())
          }
          if (startWithLorem && paragraphs.length > 0) {
            paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }
          result = paragraphs.join('\n\n')
          break
      }

      setGeneratedText(result)
      setIsGenerating(false)
    }, 200)
  }, [generationType, count, startWithLorem])

  const copyToClipboard = async () => {
    if (!generatedText) return
    
    try {
      await navigator.clipboard.writeText(generatedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const clearText = () => {
    setGeneratedText('')
    setCopied(false)
  }

  // Generate initial text on component mount
  useEffect(() => {
    generateText()
  }, [])

  const getCountOptions = () => {
    switch (generationType) {
      case 'words':
        return [5, 10, 25, 50, 100, 200, 500]
      case 'sentences':
        return [1, 3, 5, 10, 15, 25, 50]
      case 'paragraphs':
        return [1, 2, 3, 5, 7, 10, 15]
      default:
        return [1, 2, 3, 5, 7, 10]
    }
  }

  const getWordCount = (text: string): number => {
    return text.trim().split(/\s+/).length
  }

  const getCharacterCount = (text: string): number => {
    return text.length
  }

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lorem Ipsum Generator Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/lorem-generator",
    "description": "Generate Lorem Ipsum placeholder text online. Create words, sentences, or paragraphs of dummy text for design mockups, web development, and content planning.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Lorem Ipsum generation",
      "Words, sentences, paragraphs",
      "Customizable count",
      "Traditional Lorem start option",
      "Copy to clipboard",
      "Word and character count"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Lorem Ipsum Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generate placeholder text for your designs and content. Create words, sentences, or paragraphs of Lorem Ipsum text.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              📝 Classic Lorem Ipsum • 🎲 Randomized content • 📊 Word counting
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              {/* Generator Settings */}
              <div className="flex items-center mb-6">
                <Settings className="h-6 w-6 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Generator Settings</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Generate Type
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'words', label: 'Words', desc: 'Individual words' },
                      { id: 'sentences', label: 'Sentences', desc: 'Complete sentences' },
                      { id: 'paragraphs', label: 'Paragraphs', desc: 'Full paragraphs' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setGenerationType(type.id as GenerationType)}
                        className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                          generationType === type.id
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-200 bg-white hover:border-yellow-300 hover:bg-yellow-50/50 text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs opacity-75">{type.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Count
                  </label>
                  <select
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                  >
                    {getCountOptions().map(option => (
                      <option key={option} value={option}>
                        {option} {generationType}
                      </option>
                    ))}
                  </select>

                  <div className="mt-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={startWithLorem}
                        onChange={(e) => setStartWithLorem(e.target.checked)}
                        className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="text-sm text-gray-700">Start with "Lorem ipsum"</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Begin with traditional Lorem Ipsum text
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <button
                  onClick={generateText}
                  disabled={isGenerating}
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-yellow-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Shuffle className="h-5 w-5" />
                      <span>Generate Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Generated Text */}
              {generatedText && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Generated Text</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center space-x-1 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={clearText}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {generatedText}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <span>{getWordCount(generatedText)} words</span>
                    <span>{getCharacterCount(generatedText)} characters</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* About Lorem Ipsum */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">About Lorem Ipsum</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  Lorem Ipsum is simply dummy text used in the printing and typesetting industry since the 1500s.
                </p>
                <div>
                  <div className="font-medium text-gray-900">Common Uses:</div>
                  <div className="text-gray-600">
                    • Web design mockups<br/>
                    • Print design layouts<br/>
                    • Content planning<br/>
                    • Typography testing
                  </div>
                </div>
              </div>
            </div>

            {/* Generator Options */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Generator Options</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <div className="font-medium text-gray-900">Words:</div>
                  <div className="text-gray-600">Generate 5-500 individual words</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Sentences:</div>
                  <div className="text-gray-600">Generate 1-50 complete sentences</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Paragraphs:</div>
                  <div className="text-gray-600">Generate 1-15 full paragraphs</div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">Quick Facts</h3>
              <div className="space-y-2 text-sm text-yellow-800">
                <div>• Based on classical Latin literature</div>
                <div>• Standard dummy text since 1960s</div>
                <div>• Focuses on visual form over content</div>
                <div>• Used by designers worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}