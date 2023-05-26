const model = [
  {
    vowel: 'a', cryptography: 'ai'
  },
  {
    vowel: 'e', cryptography: 'enter'
  },
  {
    vowel: 'i', cryptography: 'imes'
  },
  {
    vowel: 'o', cryptography: 'ober'
  },
  {
    vowel: 'u', cryptography: 'ufat'
  },
] 

let mainTextArea = document.querySelector('#main-textarea')
let encryptedTextArea = document.querySelector('#encrypted-textarea')
let asideResultDiv = document.querySelector('#aside-result')
var asideNoMessageDiv = document.querySelector('#aside-no-message');

const btnEncrypt = document.querySelector('.btn-encrypt')
const btnDecrypt = document.querySelector('.btn-decrypt')
const btnCopy = document.querySelector('.btn-copy')


function encrypt() {

  const message = mainTextArea.value.toLowerCase()

  const isValidMessage = verifyMessage(message)

  if(!isValidMessage){
    return
  }

  const lettersArray = message.split('')

  if(lettersArray.length === 0) {
    showNoMessageImg()
    return
  }

  const encryptedText = lettersArray.map(letter => {
    for (const option of model) {
      if(option.vowel === letter){
        return option.cryptography
      }
    }
    return letter
  })

  showEncryptedMessage(encryptedText.join(''))
}

function decrypt() {

  const message = mainTextArea.value.toLowerCase()

  const isValidMessage = verifyMessage(message)

  if(!isValidMessage){
    return
  }

  let decrypt = message

  if(decrypt === ''){
    showNoMessageImg()
    return
  }

  for(const option of model){
    decrypt = decrypt.replaceAll(option.cryptography, option.vowel)
  }

  showEncryptedMessage(decrypt)
}

function showEncryptedMessage(result) {  
  asideNoMessageDiv.classList.add('none')
  asideNoMessageDiv.classList.remove('no-message')
  
  encryptedTextArea.value = result
  
  asideResultDiv.classList.add('aside')
  asideResultDiv.classList.remove('none')
}

function showNoMessageImg(){
  asideResultDiv.classList.add('none')
  asideResultDiv.classList.remove('aside')
  
  asideNoMessageDiv.classList.remove('none')
  asideNoMessageDiv.classList.add('no-message')
}

function copyEncryptedMessage() {
  var copyText = encryptedTextArea

  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value);
  
  mainTextArea.value = ''
  mainTextArea.focus()
}

function verifyMessage(message) {
  let invalidMessageImage = document.querySelector('.notice-message img')
  let invalidMessageText = document.querySelector('.notice-message p')

  const regex = /[^a-zA-Z ]/gm

  const isNotValid = regex.test(message)

  if(isNotValid){
    invalidMessageImage.classList.add('invalid-message-image')
    invalidMessageText.classList.add('invalid-message-text')
    mainTextArea.classList.add('invalid-message-textarea')

    showNoMessageImg()

    return false

  } else {
    invalidMessageImage.classList.remove('invalid-message-image')
    invalidMessageText.classList.remove('invalid-message-text')
    mainTextArea.classList.remove('invalid-message-textarea')

    return true
  }
}

mainTextArea.focus()

btnEncrypt.onclick = encrypt
btnDecrypt.onclick = decrypt
btnCopy.onclick = copyEncryptedMessage