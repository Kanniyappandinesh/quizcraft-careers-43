
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";

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
      className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl shadow-lg border border-purple-200 overflow-auto max-w-full"
    >
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text mb-2">
        Data Flow Diagram
      </h2>
      <Separator className="mt-2 mb-6 mx-auto w-24 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]" />
      
      <div className="flex justify-center">
        <img 
          src={imageUrl} 
          alt="CareerQuest Data Flow Diagram" 
          className="max-w-full h-auto rounded shadow-md"
        />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Diagram Components</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="text-purple-600 font-medium">External Entity:</span> Users interacting with the system</li>
            <li><span className="text-blue-600 font-medium">Processes:</span> Quiz System, Career Matching, Dashboard Generation, Career Details, and Expert Advice</li>
            <li><span className="text-gray-600 font-medium">Data Stores:</span> Quiz Results Store and Career Information Store</li>
            <li><span className="text-black font-medium">Data Flows:</span> Arrows showing how information moves through the system</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Process Explanation</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Users provide inputs through the quiz</li>
            <li>The system processes answers and matches with careers</li>
            <li>Results are stored in the database</li>
            <li>Dashboard visualizes the results and shows career matches</li>
            <li>Users can explore career details and get expert advice</li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
};

export default DFDDiagram;
