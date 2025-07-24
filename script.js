async function generatePDF() {

  const element = document.getElementById("cv");
  const clone = element.cloneNode(true);

  // Conteneur hors écran
  const hiddenContainer = document.createElement("div");
  hiddenContainer.style.position = "absolute";
  hiddenContainer.style.left = "-9999px";
  hiddenContainer.appendChild(clone);
  document.body.appendChild(hiddenContainer);

  // Appliquer des styles au clone uniquement
  clone.style.width = "43%";

  if (window.innerWidth < 769) {
    clone.style.flexDirection = "initial";
    clone.children[0].style.width = "300px";
    clone.children[0].style.borderRight = "1px solid #ddd";
    clone.children[0].style.borderBottom = "none";
    clone.children[1].style.padding = "2rem";
  }

  // Utiliser html2canvas sur le clone
  const canvas = await html2canvas(clone, { scale: 2 });

  const imgData = canvas.toDataURL('image/jpeg');

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pageWidth = 210;
  const pageHeight = 297;

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pageWidth;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('cv_mathieu_mustin.pdf');

  // Nettoyer après usage
  document.body.removeChild(hiddenContainer);
}
