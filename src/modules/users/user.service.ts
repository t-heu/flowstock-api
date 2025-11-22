import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { supabase } from "../../config/supabase";

export const userService = {
  async getAllUser() {
    const { data, error } = await supabase
      .from("users")
      .select(`
        *,
        branch:branches(id, name)  -- o "branch" é o alias
      `);

    if (error) return { success: false, error: error.message };

    const users = data.map((u: any) => ({
      ...u,
      password: undefined,
      created_at: u.created_at ?? new Date().toISOString(),
      role: u.role ?? "operator",
      department: u.department ?? null,
      branch: u.branch ?? null, // inclui a filial associada
    }));

    return { success: true, data: users };
  },

  async createUser(payload: any) {
    const hashedPassword = await bcrypt.hash("123", 10);

    const newUser = {
      id: uuidv4(),
      name: payload.name,
      username: payload.username,
      email: payload.email,
      role: payload.role ?? "operator",
      department: payload.department ?? null,
      password: hashedPassword,
      branch_id: payload.branchId,
    };

    const { error } = await supabase.from("users").insert([newUser]);
    if (error) {
      if (error.code === "23505") {
        return { success: false, error: "Email ou username já cadastrado" };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  async updateUser(id: string, updates: any) {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    } else {
      delete updates.password;
    }

    if (updates.department === "") updates.department = null;
    if (updates.department === undefined) delete updates.department;

    delete updates.branch;

    const { error } = await supabase.from("users").update(updates).eq("id", id);
    if (error) return { success: false, error: error.message };

    return { success: true };
  },

  async deleteUser(id: string) {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
};
