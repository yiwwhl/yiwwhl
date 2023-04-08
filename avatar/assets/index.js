const ColorMap = {
  '#45312d': getBlockByStartAndEnd(112, 143).concat(
    getBlockByStartAndEnd(101, 106).concat(getBlockByStartAndEnd(149, 154))
  ),
  '#fff': getBlockByStartAndEnd(118, 121).concat(
    getBlockByStartAndEnd(134, 137)
  ),
}

function blockIndexProducer(start, end, originalEnd, length) {
  if (!length) {
    length = end - start - 1
  }
  if (!originalEnd) {
    originalEnd = end
  }
  return [start, end]
    .concat(
      end >= originalEnd - length &&
        blockIndexProducer(start + 1, end - 1, originalEnd, length)
    )
    .filter((i) => !!i)
}

function getBlockByStartAndEnd(start, end) {
  return Array.from(new Set(blockIndexProducer(start, end)))
}

const flatColorMap = {}
for (let color in ColorMap) {
  ColorMap[color].forEach((index) => {
    flatColorMap[index] = color
  })
}
let avatatContainer
const domProducer = (length = 64) => {
  const frameElement = document.createDocumentFragment()
  for (let i = 0; i < length; i++) {
    const div = document.createElement('div')
    if (i < Math.ceil(length / 2)) {
      div.style.background = '#d1341d'
    } else {
      div.style.background = '#eae9e7'
    }
    if (i in flatColorMap) {
      div.style.background = flatColorMap[i]
    }
    frameElement.appendChild(div)
  }
  return frameElement
}

function draw(domId) {
  avatatContainer = document.getElementById(domId)
  avatatContainer.appendChild(domProducer(256))
}
