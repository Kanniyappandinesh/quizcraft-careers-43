
import { supabase } from "@/integrations/supabase/client";
import { importCareerDataToSupabase } from "./importCareerData";

export const initializeSupabase = async () => {
  try {
    // Import career data if needed
    await importCareerDataToSupabase();
    
    // Check if we have DFD diagram in storage, if not upload it
    const { data: filesList, error: listError } = await supabase
      .storage
      .from('career_quest_images')
      .list('diagrams');
      
    if (listError) throw listError;
    
    const hasDfdDiagram = filesList?.some(file => file.name.includes('DFD'));
    
    if (!hasDfdDiagram) {
      // We'll handle initial file uploads through the UI
      console.log("DFD diagram needs to be uploaded");
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error initializing Supabase:", error);
    return { success: false, error };
  }
};
