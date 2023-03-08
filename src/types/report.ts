
export type TGenerateTable = (p: {
  doc: PDFKit.PDFDocument,
  data:  { no: number; name: string; phone: string; address: string; description: string; visitDate: Date }[]
}) => void