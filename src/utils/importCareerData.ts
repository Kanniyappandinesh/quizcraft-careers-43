
import { supabase } from "@/integrations/supabase/client";
import { careerDetails } from "./careerData";

export const importCareerDataToSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('career_details')
      .select('title');
      
    if (error) throw error;
    
    // Check if we already have career data
    if (data && data.length > 0) {
      console.log("Career data already exists in the database");
      return { success: true, message: "Career data already exists" };
    }
    
    // Insert career data
    const { error: insertError } = await supabase
      .from('career_details')
      .insert(
        careerDetails.map(career => ({
          title: career.title,
          description: career.description,
          long_description: career.longDescription,
          skills: career.skills,
          outlook: career.outlook,
          education: career.education,
          salary: career.salary,
          day_in_life: career.dayInLife,
          success_stories: career.successStories,
          video_embeds: career.videoEmbeds,
          related_careers: career.relatedCareers
        }))
      );
      
    if (insertError) throw insertError;
    
    return { success: true, message: "Career data imported successfully" };
  } catch (error) {
    console.error("Error importing career data:", error);
    return { success: false, message: "Error importing career data" };
  }
};
