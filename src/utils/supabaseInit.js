
import { supabase } from "@/integrations/supabase/client";
import { importCareerDataToSupabase } from "./importCareerData";

export const initializeSupabase = async () => {
  try {
    console.log("Initializing Supabase...");
    
    // Import career data if needed
    const importResult = await importCareerDataToSupabase();
    
    if (!importResult.success) {
      console.warn("Career data import was not successful:", importResult.message);
    } else {
      console.log("Career data import status:", importResult.message);
    }
    
    // Check if we have DFD diagram in storage, if not upload it
    try {
      const { data: filesList, error: listError } = await supabase
        .storage
        .from('career_quest_images')
        .list('diagrams');
        
      if (listError) {
        console.error("Error listing files in storage:", listError);
      } else {
        const hasDfdDiagram = filesList?.some(file => file.name.includes('DFD'));
        
        if (!hasDfdDiagram) {
          console.log("DFD diagram needs to be uploaded");
        } else {
          console.log("DFD diagram already exists in storage");
        }
      }
    } catch (storageError) {
      console.error("Error checking storage:", storageError);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error initializing Supabase:", error);
    return { success: false, error };
  }
};
