import { Flatfile } from '@flatfile/api'

function numberToWords(n) {
  const ones = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ]
  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ]

  if (n < 20) return ones[n]
  if (n < 100)
    return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '')
  if (n === 100) return 'One Hundred'
  return ''
}

const fields = []
for (let i = 1; i <= 100; i++) {
  let label = numberToWords(i)
  fields.push({
    key: label.toLowerCase().replace(/ |-/g, ''),
    type: 'string',
    label,
  })
}

export const oneHundredSheet: Flatfile.SheetConfig = {
  name: 'One Hundred',
  slug: 'oneHundred',
  fields,
  actions: [
    {
      operation: 'processRecords',
      mode: 'foreground',
      label: '[Fetch] Process Records',
    },
    {
      operation: 'sdkProcessRecords',
      mode: 'foreground',
      label: '[SDK] Process Records',
    },
  ],
}
