import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const accessCode = searchParams.get('code') || 'GHOST-00000';
  const product = searchParams.get('product') || 'Service';
  const duration = searchParams.get('duration') || '24 Hours';
  const price = searchParams.get('price') || '£0.00';

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      let yPos = 20;
      const leftMargin = 20;
      const contentWidth = 170;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text('PHANTOMPATH – GHOST BRIEFING', leftMargin, yPos);
      yPos += 10;

      doc.setFont('courier', 'bold');
      doc.setFontSize(12);
      doc.text(`STATUS: CONNECTION ESTABLISHED // ID: ${accessCode}`, leftMargin, yPos);
      yPos += 15;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const introText = 'Welcome, Ghost. Your path is open. Operating outside the traditional grid.';
      doc.text(doc.splitTextToSize(introText, contentWidth), leftMargin, yPos);
      yPos += 15;

      doc.setFont('helvetica', 'bold');
      doc.text('Protocols:', leftMargin, yPos);
      yPos += 8;
      
      doc.setFont('helvetica', 'normal');
      ['• One Path, One Device', '• 24-hour Erasure', '• No Trace'].forEach(protocol => {
        doc.text(protocol, leftMargin + 5, yPos);
        yPos += 7;
      });
      yPos += 5;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('YOUR SESSION DETAILS', leftMargin, yPos);
      yPos += 10;

      doc.setFontSize(11);
      doc.text('Component', leftMargin, yPos);
      doc.text('Status', leftMargin + 80, yPos);
      yPos += 3;
      doc.setLineWidth(0.5);
      doc.line(leftMargin, yPos, leftMargin + contentWidth, yPos);
      yPos += 7;

      doc.setFont('helvetica', 'normal');
      [
        { col1: 'Product', col2: product },
        { col1: 'Duration', col2: duration },
        { col1: 'Price', col2: price },
        { col1: 'Access Code', col2: accessCode }
      ].forEach(row => {
        doc.text(row.col1, leftMargin, yPos);
        doc.text(row.col2, leftMargin + 80, yPos);
        yPos += 8;
      });
      yPos += 10;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('LEGAL NOTICE', leftMargin, yPos);
      yPos += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const legalText = 'Digital service delivered instantly. By purchasing, you request immediate performance and acknowledge that your 14-day cooling-off period will be waived once activated. IMPORTANT: PhantomPath numbers DO NOT support emergency calling (999, 112, or 911). You must maintain an alternative means of contacting emergency services.';
      const splitLegalText = doc.splitTextToSize(legalText, contentWidth);
      doc.text(splitLegalText, leftMargin, yPos);
      yPos += (splitLegalText.length * 5) + 10;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('COMPLIANCE / ADR', leftMargin, yPos);
      yPos += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const adrText = 'If a resolution is not reached within 6 weeks, we will provide a written Statement of Right to ADR to allow independent escalation to CISAS.';
      const splitAdrText = doc.splitTextToSize(adrText, contentWidth);
      doc.text(splitAdrText, leftMargin, yPos);
      yPos += (splitAdrText.length * 5) + 15;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('DURABLE RECORD', leftMargin, yPos);
      yPos += 8;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.text('This is your durable record of service. Please download and retain it for your records.', leftMargin, yPos);

      doc.save('phantompath-contract-summary.pdf');
      
      toast({ title: "Briefing Downloaded", description: "Your secure contract summary has been saved to your device." });
    } catch {
      toast({ variant: "destructive", title: "Download Failed", description: "There was an error generating your secure document." });
    }
  };

  return (
    <div className="min-h-screen bg-[#050b14] pt-28 pb-20 px-4 flex flex-col items-center relative overflow-hidden">
      <Helmet><title>Success | PhantomPath Portal</title></Helmet>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00ffc8]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-3xl relative z-10 flex flex-col items-center">
        <div className="w-full text-center mb-12">
          <h1 className="font-bold text-[clamp(1rem,4vw,1.5rem)] text-[#00ffc8] m-0 leading-relaxed uppercase break-words"
            style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.15em', textShadow: '0 0 10px rgba(0, 255, 200, 0.7)' }}>
            STATUS: CONNECTION ESTABLISHED<br className="hidden sm:block" /> // ID: {accessCode}
          </h1>
          <div className="w-full h-px bg-[#00ffc8]/30 mt-6 shadow-[0_0_8px_rgba(0,255,200,0.5)]" />
        </div>

        <div className="w-full text-center py-6 sm:py-12 mb-8">
          <p className="text-white text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.05em' }}>
            Welcome, Ghost. Your path is open. Operating outside the traditional grid. Protocols: One Path, One Device; 24-hour Erasure; No Trace. Do not lose your access code.
          </p>
        </div>

        {/* Access Code Display */}
        <div className="w-full bg-[#0a1120]/80 border border-[#00ffc8]/20 rounded-xl p-6 mb-8 text-center">
          <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-2">Your access code</p>
          <p className="text-[#00ffc8] text-xl sm:text-2xl font-bold font-mono tracking-wider select-all break-all">{accessCode}</p>
          <p className="text-gray-600 text-[10px] font-mono mt-2">Save this code. It cannot be recovered.</p>
        </div>

        <div className="w-full border-2 border-[#00ffc8] rounded-lg p-6 bg-black/40 shadow-[0_0_15px_rgba(0,255,200,0.1)] backdrop-blur-sm mb-12">
          <p className="text-white text-sm sm:text-base leading-relaxed font-medium mb-4 text-center">
            LEGAL NOTICE: Digital service delivered instantly. By purchasing, you request immediate performance and acknowledge that your 14-day cooling-off period will be waived once activated. IMPORTANT: PhantomPath numbers DO NOT support emergency calling (999, 112, or 911). You must maintain an alternative means of contacting emergency services.
          </p>
          <div className="h-px w-full bg-[#00ffc8]/30 my-4" />
          <p className="text-[#00ffc8]/80 text-xs sm:text-sm leading-relaxed text-center font-mono">
            ADR COMPLIANCE: If a resolution is not reached within 6 weeks, we will provide a written 'Statement of Right to ADR' to allow escalation to CISAS.
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-4 mb-8">
          <Button onClick={handleDownloadPDF}
            className="relative bg-[#00ffc8]/10 border border-[#00ffc8] text-[#00ffc8] hover:bg-[#00ffc8] hover:text-[#050b14] font-bold text-sm sm:text-base h-16 px-6 sm:px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,200,0.4)] flex items-center justify-center gap-3 w-full sm:w-auto"
            style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
            <span className="text-xl">📥</span>
            <span className="tracking-wider text-center whitespace-normal sm:whitespace-nowrap leading-tight">
              SAVE CONTRACT SUMMARY & ACCESS RECEIPT
            </span>
          </Button>

          <Button onClick={() => navigate('/portal')}
            className="bg-white/5 border border-white/10 text-white hover:bg-white/10 font-medium text-sm h-12 px-8 rounded-xl transition-all w-full sm:w-auto">
            Open Portal →
          </Button>

          <p className="text-gray-400 mt-2 text-sm font-medium text-center">
            This is your durable record of service. Please download and retain it.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;