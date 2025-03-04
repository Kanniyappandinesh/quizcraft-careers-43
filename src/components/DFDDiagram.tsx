
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const DFDDiagram = () => {
  const [imageUrl, setImageUrl] = useState<string>("/src/assets/CareerQuestDFD.svg");
  
  useEffect(() => {
    const getStorageUrl = async () => {
      try {
        // Check if the image exists in storage
        const { data, error } = await supabase
          .storage
          .from('career_quest_images')
          .list('diagrams');
          
        if (error) throw error;
        
        // If we find the DFD image in storage, get its public URL
        const dfdImage = data?.find(file => file.name.includes('DFD'));
        if (dfdImage) {
          const { data: publicUrlData } = supabase
            .storage
            .from('career_quest_images')
            .getPublicUrl(`diagrams/${dfdImage.name}`);
            
          if (publicUrlData?.publicUrl) {
            setImageUrl(publicUrlData.publicUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching DFD image from storage:", error);
      }
    };
    
    getStorageUrl();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 overflow-auto max-w-full"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Data Flow Diagram</h2>
      <div className="flex justify-center">
        <img 
          src={imageUrl} 
          alt="CareerQuest Data Flow Diagram" 
          className="max-w-full h-auto"
        />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2"><strong>DFD Diagram Components:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="text-purple-600 font-medium">External Entity:</span> Users interacting with the system</li>
          <li><span className="text-blue-600 font-medium">Processes:</span> Quiz System, Career Matching, Dashboard Generation, Career Details, and Expert Advice</li>
          <li><span className="text-gray-600 font-medium">Data Stores:</span> Quiz Results Store and Career Information Store</li>
          <li><span className="text-black font-medium">Data Flows:</span> Arrows showing how information moves through the system</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default DFDDiagram;
