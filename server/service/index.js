const fs = require('fs');

const filePath = {
  person: './server/local/person.txt',
  open: './server/local/open.txt'
}

const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8')
    return data
  }
  catch(err) {
    console.log(err)
  }
}

const appendFile = async (filePath, content) => {
  try {
    const data = await fs.promises.appendFile(filePath, content)
    return data
  }
  catch(err) {
    console.log(err)
  }
}

const writeFile = async (filePath, content) => {
  try {
    const data = await fs.promises.writeFile(filePath, content)
    return data
  }
  catch(err) {
    console.log(err)
  }
}

const formatString = (str) => str.toLowerCase().replace(/\s/, '')

exports.addContent = async ({ file, name }) => {

  const openFile = await readFile(filePath.open)
  const openFileData = openFile.split('\n')
  const alreadyOpen = openFileData.find(el => formatString(el) == formatString(name))
  if(!alreadyOpen)
    await appendFile(filePath[file], `\n${name}`)

}

exports.openTo = async () => {

  const openFile = await readFile(filePath.open)
  const personFile = await readFile(filePath.person)

  if(personFile){

    const openFileData = openFile.split('\n')

    return personFile.split('\n').map(person => {
      if(!person)
        return false

      const alreadyOpen = openFileData.find(el => formatString(el) == formatString(person))
      if(alreadyOpen)
        return false

      return person.replace('\r', '')

    }).filter(el => el)

  }

  return []


}

exports.clear = async () => {
  await writeFile(filePath.person, '')
  await writeFile(filePath.open, '')
}