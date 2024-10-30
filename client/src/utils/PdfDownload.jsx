import React, { useRef,forwardRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../images/logo.jpg'
const PdfDownload = forwardRef(({ investmentProfile, investments, receipts }, ref) => {
  const pdfRef = useRef();


  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => { // Adjust scale to capture full content
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const adjustedWidth = imgWidth * ratio; // Adjusted width of the image
      const adjustedHeight = imgHeight * ratio; // Adjusted height of the image
      const posX = (pdfWidth - adjustedWidth) / 2; // Position X to center the image horizontally
      const posY = (pdfHeight - adjustedHeight) / 2; // Position Y to center the image vertically
      pdf.addImage(imgData, 'PNG', posX, posY, adjustedWidth, adjustedHeight);
      // pdf.save('invoice.pdf');
      const pdfBlob = pdf.output('blob');

      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      // Open the PDF in a new tab
      window.open(pdfUrl, '_blank');
    });
  };


  // Merge data based on investment_profile_id
  const mergedData = investmentProfile.map((profile, index) => ({
    ...profile,
    ...investments.find((investment) => investment.investment_profile_id === profile._id),
    ...receipts.find((receipt) => receipt.investment_profile_id === profile._id),
  }));

  return (
    <div ref={ref} className='text-black'>
      <div className='overflow-x-auto' style={{ maxWidth: '100%' }}>
        <div ref={pdfRef}>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-center my-8'>
              <div className='flex md:flex-row flex-col items-center md:justify-between w-[72vw]'>
              {mergedData.length > 0 && (
                <div className='text-black md:text-start font-bold px-4'>
                  <h1><span className='font-light text-[4vw] sm:text-sm'></span> {mergedData[0].user_id.fullName}</h1>
                  <h1><span className='font-light text-[4vw] sm:text-sm'></span> {mergedData[0].user_id.cnicNumber}</h1>
                  <h1><span className='font-light text-[4vw] sm:text-sm'></span> {mergedData[0].user_id.mobileNumber}</h1>
                  <h1><span className='font-light text-[4vw] sm:text-sm'></span> {mergedData[0].user_id.email}</h1>
                </div>
              )}
              <div className='mt-4'>
                <img className='w-32 h-32 object-cover rounded-full' src={logo} alt='' />
              </div>
              </div>
            </div>
            {/* <table className='w-full'>
              <thead>
                <tr>
                  <th className='px-2 py-1 bg-gray-200 text-left'>Date</th>
                  <th className='px-2 py-1 bg-gray-200 text-left'>Transaction ID</th>
                  <th className='px-2 py-1 bg-gray-200 text-left'>Payment Amount</th>
                  <th className='px-2 py-1 bg-gray-200 text-left'>Payment Frequency</th>
                </tr>
              </thead>
              <tbody>
                {mergedData.map((data, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                    <td className='px-2 py-1'>{data.Investments.investment_date}</td>
                    <td className='px-2 py-1'>{data.receipt_id}</td>
                    <td className='px-2 py-1'>{data.Investments.investment_amount}</td>
                    <td className='px-2 py-1'>
                      {data.investment_frequency === '1' && 'Monthly'}
                      {data.investment_frequency === '6' && 'Bi-annually'}
                      {data.investment_frequency === '12' && 'Annually'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}


<table className='w-full'>
  <thead>
    <tr>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Date</th>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Transaction ID</th>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Payment Amount</th>
      <th className='px-2 py-1 bg-gray-200 text-left text-[2.5vw] sm:text-sm '>Payment Frequency</th>
    </tr>
  </thead>
  <tbody>
    {mergedData.map((data, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.Investments.investment_date}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.receipt_id}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>{data.Investments.investment_amount}</td>
        <td className='px-2 py-1 text-[2.5vw] sm:text-sm  '>
          {data.investment_frequency === '1' && 'Monthly'}
          {data.investment_frequency === '6' && 'Bi-annually'}
          {data.investment_frequency === '12' && 'Annually'}
        </td>
      </tr>
    ))}
  </tbody>
</table>



            <div className='my-8 px-4'>
              <h2 className='text-lg font-bold text-[4vw] sm:text-sm'>Privacy Policy:</h2>
              <ul className='list-disc pl-4'>
                <li className='mt-2 text-[4vw] sm:text-sm'>We are committed to protecting the privacy and security of our users' personal information.</li>
                <li className='mt-2 text-[4vw] sm:text-sm'>We collect and use personal information only for legitimate business purposes and with the consent of the user.</li>
                <li className='mt-2 text-[4vw] sm:text-sm'>We do not share personal information with third parties unless necessary for providing our services or as required by law.</li>
                <li className='mt-2 text-[4vw] sm:text-sm'>Users have the right to access, update, and delete their personal information as per our privacy policy guidelines.</li>
              </ul>
            </div>
            <div className='border-t-2 px-4 border-indigo-500 h-16 flex items-center justify-center'>
              <h2>CEO Rizwan Akram </h2>
            </div>
            <div className='w-full flex justify-center mt-8 mb-4'>
              <button className='bg-indigo-500 text-white rounded-lg px-6 py-3' onClick={downloadPDF}>Download</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PdfDownload;


