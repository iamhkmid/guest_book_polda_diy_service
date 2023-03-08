import PDFDocument from "pdfkit-table"
import fs from "fs"
import moment from "moment";
import "moment/locale/id"
import path from "path";
import { TGenerateTable } from "../../../types/report";

export const stringPath = (str: string) =>
  str.replace(/([^a-z0-9 ]+)/gi, " ").replace(/\s+/g, " ").replace(/ /g, "-").toLowerCase();

const generateHr = (doc: PDFKit.PDFDocument, y: number) => {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

type TGenHeader = (p: { doc: PDFKit.PDFDocument; startDate: Date; endDate: Date }) => void

const generateHeader: TGenHeader = ({ doc, startDate, endDate }) => {
  doc.fillColor('#000')
    .fontSize(12)
    .font(path.join(process.cwd(), "/src/assets/fonts/roboto/Roboto-Bold.ttf"))
    .text("POLRI DAERAH ISTIMEWA YOGYAKARTA", 50, 50, { align: "center" })
    .text("RESOR KOTA YOGYAKARTA SEKTOR GONDOKUSUMAN", 50, 65, { align: "center" })
    .text(`LAPORAN KUNJUNGAN PERIODE ${moment(startDate).locale("id").format("DD MMMM")} - ${moment(endDate).locale("id").format("DD MMMM YYYY")}`, 50, 80, { align: "center" })
  doc.lineCap('butt')
    .lineWidth(3)
    .moveTo(50, 100)
    .lineTo(550, 100)
    .stroke()
    .moveDown()
}

const generateFooter = (doc: PDFKit.PDFDocument) => {
  doc.fontSize(10)
    .text('Payment is due within 15 days. Thank you for your business.', 50, 780, { align: 'center', width: 500 });
}

type TGenTabRow = (doc: PDFKit.PDFDocument, y: number, c1: string, c2: string, c3: string, c4: string, c5: string, c6: string) => void

const generateTableRow: TGenTabRow = (doc, y, c1, c2, c3, c4, c5, c6) => {
  doc.fontSize(8)
    .text(c1, 50, y)
    .text(c2, 100, y)
    .text(c3, 200, y)
    .text(c4, 250, y)
    .text(c5, 300, y)
    .text(c6, 350, y);
}

const generateTable: TGenerateTable = ({ doc, data }) => {
  let i,
    invoiceTableTop = 330;
  doc.font(path.join(process.cwd(), "/src/assets/fonts/roboto/Roboto-Medium.ttf"))
    .fontSize(10)
  generateTableRow(
    doc,
    invoiceTableTop,
    "No",
    "Nama",
    "Phone",
    "Alamat",
    "Keperluan",
    "Tanggal Kunjungan"
  );
  generateHr(doc, invoiceTableTop + 20);

  doc.font(path.join(process.cwd(), "/src/assets/fonts/roboto/Roboto-Regular.ttf"))

  for (i = 0; i < data.length; i++) {
    const item = data[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      String(item.no),
      item.name,
      item.phone,
      item.address,
      item.description,
      moment(item.visitDate).locale("id").format("DD MMMM YYYY"),
    );
    generateHr(doc, position + 20);
  }
}

type TCreateReport = (data: any, path: any) => void

export const createReport: TCreateReport = (data, path) => {
  let doc = new PDFDocument({ margins: { left: 50, right: 50, top: 50, bottom: 50 }, size: "A4" });

  generateHeader({ doc, startDate: new Date(), endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) });
  generateTable({ doc, data })
  // generateFooter(doc); // Invoke `generateFooter` function.

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}



const data = [
  {
    no: "1",
    name: "ayam",
    address: "aadadawd",
    phone: "08987837256",
    description: "adawdawdjkwawdkj",
    visitDate: new Date()
  },
  {
    no: "2",
    name: "ayam2",
    address: "aadadawd",
    phone: "08987837256",
    description: "adawdawdjkwawdkj",
    visitDate: new Date()
  }
]
createReport(data, "test.pdf")