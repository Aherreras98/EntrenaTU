import { StorageRepository } from "../repositories/StorageRepository";
import { supabase } from "./client";

export class SupabaseStorageRepository implements StorageRepository {
  
  async uploadFile(bucketName: string, filePath: string, file: File): Promise<{ data?: { publicUrl: string }; error?: any; }> {
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { upsert: true });

    if (error) return { error };

    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    
    
    // TIMESTAP PARA QUE REACT NO GUARDE EN LA CACHE LA FOTO ANTIGUA
    const urlConTimestamp = `${publicUrl}?t=${new Date().getTime()}`;
    return { data: { publicUrl: urlConTimestamp } };
  }

  async getPublicUrl(bucketName: string, filePath: string): Promise<{ data: { publicUrl: string } }> {
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    return { data: { publicUrl: data.publicUrl } };
  }
}