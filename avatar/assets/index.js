const StyleMap = new Map()

StyleMap.set(
  {
    background: '#45312d',
    borderTop: '1px solid #000',
    boxShadow: '0 0 5px #000',
  },
  getBlockByStartAndEnd(112, 143).concat(
    getBlockByStartAndEnd(101, 106).concat(getBlockByStartAndEnd(149, 154))
  )
)
StyleMap.set(
  {
    background: '#fff',
    border: 'none',
    boxShadow: 'none',
  },
  getBlockByStartAndEnd(118, 121).concat(getBlockByStartAndEnd(134, 137))
)
StyleMap.set(
  {
    borderRadius: '20px 0 0 0',
  },
  getBlockByStartAndEnd(101)
)
StyleMap.set(
  {
    borderRadius: '0 20px 0 0',
  },
  getBlockByStartAndEnd(106)
)
StyleMap.set(
  {
    borderRadius: '0 0 0 20px',
  },
  getBlockByStartAndEnd(149)
)
StyleMap.set(
  {
    borderRadius: '0 0 20px 0',
  },
  getBlockByStartAndEnd(154)
)

const flatColorMap = {}

Array.from(StyleMap.keys()).forEach((i) => {
  StyleMap.get(i).forEach((index) => {
    flatColorMap[index] = flatColorMap[index] ?? {}
    flatColorMap[index] = Object.assign(flatColorMap[index], i)
  })
})

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
      for (const styleItem in flatColorMap[i]) {
        div.style[styleItem] = flatColorMap[i][styleItem]
      }
    }
    frameElement.appendChild(div)
  }
  return frameElement
}

function draw(domId) {
  avatatContainer = document.getElementById(domId)
  ;(avatatContainer.style.background =
    'linear-gradient(to bottom, #d1341d 50%, #eae9e7 50%)'),
    avatatContainer.appendChild(domProducer(256))
}
