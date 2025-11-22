import { supabase } from "../config/supabase";
import { v4 as uuidv4 } from "uuid";

export const getBranches = async () => {
  try {
    const { data, error } = await supabase.from("branches").select("*");

    if (error) throw error;

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const addBranch = async (branch: any) => {
  try {
    const newBranch = {
      id: uuidv4(),
      ...branch,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("branches").insert([newBranch]);

    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const updateBranch = async (id: string, updates: any) => {
  try {
    const { error } = await supabase.from("branches").update(updates).eq("id", id);
    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const deleteBranch = async (id: string) => {
  try {
    const { error } = await supabase.from("branches").delete().eq("id", id);
    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};
