const host = process.env.GRIDSOME_JUDGE0_HOST || 'https://judge0-ce.p.rapidapi.com'
const defaultApiKey = process.env.GRIDSOME_JUDGE0_API_KEY

const headers = {
  'content-type': 'application/json',
  'Content-Type': 'application/json',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
}

function getApiKey() {
  return localStorage.getItem('apiKey') || defaultApiKey
}

function setApiKey(apiKey) {
  if (apiKey == null || apiKey === '' || apiKey == defaultApiKey) {
    localStorage.removeItem('apiKey')
    return
  }
  localStorage.setItem('apiKey', apiKey)
}

async function submitBatch(submissions) {
  try {
    const response = await fetch(
      `${host}/submissions/batch`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'X-RapidAPI-Key': getApiKey(),
        },
        body: JSON.stringify({
          submissions
        })
      }
    )

    if (!response.ok) {
      throw new Error(response.statusText || response.status)
    }

    const data = await response.json()
    return data
  } catch (error) {
    // TODO: better error handling
    throw error
  }
}

async function checkBatchSubmissions(tokens) {
  try {
    const response = await fetch(
      `${host}/submissions/batch?tokens=${tokens.join(',')}`,
      {
        method: 'GET',
        headers: {
          ...headers,
          'X-RapidAPI-Key': getApiKey(),
        },
      }
    )

    if (!response.ok) {
      throw new Error(response.statusText || response.status)
    }

    const data = await response.json()
    return data
  } catch (error) {
    // TODO: better error handling
    throw error
  }
}

const languages = [
  {
    "id": 45,
    "name": "Assembly (NASM 2.14.02)"
  },
  {
    "id": 46,
    "name": "Bash (5.0.0)"
  },
  {
    "id": 47,
    "name": "Basic (FBC 1.07.1)"
  },
  {
    "id": 75,
    "name": "C (Clang 7.0.1)"
  },
  {
    "id": 76,
    "name": "C++ (Clang 7.0.1)"
  },
  {
    "id": 48,
    "name": "C (GCC 7.4.0)"
  },
  {
    "id": 52,
    "name": "C++ (GCC 7.4.0)"
  },
  {
    "id": 49,
    "name": "C (GCC 8.3.0)"
  },
  {
    "id": 53,
    "name": "C++ (GCC 8.3.0)"
  },
  {
    "id": 50,
    "name": "C (GCC 9.2.0)"
  },
  {
    "id": 54,
    "name": "C++ (GCC 9.2.0)"
  },
  {
    "id": 86,
    "name": "Clojure (1.10.1)"
  },
  {
    "id": 51,
    "name": "C# (Mono 6.6.0.161)"
  },
  {
    "id": 77,
    "name": "COBOL (GnuCOBOL 2.2)"
  },
  {
    "id": 55,
    "name": "Common Lisp (SBCL 2.0.0)"
  },
  {
    "id": 56,
    "name": "D (DMD 2.089.1)"
  },
  {
    "id": 57,
    "name": "Elixir (1.9.4)"
  },
  {
    "id": 58,
    "name": "Erlang (OTP 22.2)"
  },
  {
    "id": 44,
    "name": "Executable"
  },
  {
    "id": 87,
    "name": "F# (.NET Core SDK 3.1.202)"
  },
  {
    "id": 59,
    "name": "Fortran (GFortran 9.2.0)"
  },
  {
    "id": 60,
    "name": "Go (1.13.5)"
  },
  {
    "id": 88,
    "name": "Groovy (3.0.3)"
  },
  {
    "id": 61,
    "name": "Haskell (GHC 8.8.1)"
  },
  {
    "id": 62,
    "name": "Java (OpenJDK 13.0.1)"
  },
  {
    "id": 63,
    "name": "JavaScript (Node.js 12.14.0)"
  },
  {
    "id": 78,
    "name": "Kotlin (1.3.70)"
  },
  {
    "id": 64,
    "name": "Lua (5.3.5)"
  },
  {
    "id": 89,
    "name": "Multi-file program"
  },
  {
    "id": 79,
    "name": "Objective-C (Clang 7.0.1)"
  },
  {
    "id": 65,
    "name": "OCaml (4.09.0)"
  },
  {
    "id": 66,
    "name": "Octave (5.1.0)"
  },
  {
    "id": 67,
    "name": "Pascal (FPC 3.0.4)"
  },
  {
    "id": 85,
    "name": "Perl (5.28.1)"
  },
  {
    "id": 68,
    "name": "PHP (7.4.1)"
  },
  {
    "id": 43,
    "name": "Plain Text"
  },
  {
    "id": 69,
    "name": "Prolog (GNU Prolog 1.4.5)"
  },
  {
    "id": 70,
    "name": "Python (2.7.17)"
  },
  {
    "id": 71,
    "name": "Python (3.8.1)"
  },
  {
    "id": 80,
    "name": "R (4.0.0)"
  },
  {
    "id": 72,
    "name": "Ruby (2.7.0)"
  },
  {
    "id": 73,
    "name": "Rust (1.40.0)"
  },
  {
    "id": 81,
    "name": "Scala (2.13.2)"
  },
  {
    "id": 82,
    "name": "SQL (SQLite 3.27.2)"
  },
  {
    "id": 83,
    "name": "Swift (5.2.3)"
  },
  {
    "id": 74,
    "name": "TypeScript (3.7.4)"
  },
  {
    "id": 84,
    "name": "Visual Basic.Net (vbnc 0.0.0.5943)"
  }
];

const defaultCompilerOptions = {
  76: '-std=c++17',
  52: '-std=c++17',
  53: '-std=c++17',
  54: '-std=c++17',
}

function setSelectedLanguage(language, options) {
  localStorage.setItem('selectedLanguage', JSON.stringify(language))
}

function getSelectedLanguage() {
  const saved = localStorage.getItem('selectedLanguage')

  if (saved) {
    return JSON.parse(saved)
  }

  return languages.find(l => l.id === 54);
}

function setCompilerOptions(languageId, options) {
  localStorage.setItem(`compilerOptions-${languageId}`, options)
}

function getCompilerOptions(languageId) {
  const saved = localStorage.getItem(`compilerOptions-${languageId}`)

  if (saved) {
    return saved
  }

  return defaultCompilerOptions[languageId] || ''
}


const statuses = [
  {
    "id": 1,
    "description": "In Queue"
  },
  {
    "id": 2,
    "description": "Processing"
  },
  {
    "id": 3,
    "description": "Accepted"
  },
  {
    "id": 4,
    "description": "Wrong Answer"
  },
  {
    "id": 5,
    "description": "Time Limit Exceeded"
  },
  {
    "id": 6,
    "description": "Compilation Error"
  },
  {
    "id": 7,
    "description": "Runtime Error (SIGSEGV)"
  },
  {
    "id": 8,
    "description": "Runtime Error (SIGXFSZ)"
  },
  {
    "id": 9,
    "description": "Runtime Error (SIGFPE)"
  },
  {
    "id": 10,
    "description": "Runtime Error (SIGABRT)"
  },
  {
    "id": 11,
    "description": "Runtime Error (NZEC)"
  },
  {
    "id": 12,
    "description": "Runtime Error (Other)"
  },
  {
    "id": 13,
    "description": "Internal Error"
  },
  {
    "id": 14,
    "description": "Exec Format Error"
  }
]

const statusesColors = {
  1: 'background-color: #f8f9fa',
  2: 'background-color: #f8f9fa',
  3: 'background-color: #d4edda',
  4: 'background-color: #f8d7da',
  5: 'background-color: #fff3cd',
  6: 'background-color: #fff3cd',
  7: 'background-color: #fff3cd',
  8: 'background-color: #fff3cd',
  9: 'background-color: #fff3cd',
  10: 'background-color: #fff3cd',
  11: 'background-color: #fff3cd',
  12: 'background-color: #fff3cd',
  13: 'background-color: #fff3cd',
  14: 'background-color: #fff3cd',
};

module.exports = {
  setApiKey,
  getApiKey,
  defaultApiKey,
  statuses,
  statusesColors,
  submitBatch,
  checkBatchSubmissions,
  defaultCompilerOptions,
  languages,
  setSelectedLanguage,
  getSelectedLanguage,
  setCompilerOptions,
  getCompilerOptions
}
