import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

export async function POST (req: NextRequest) {

    const bucket = 'images';
    const newFileName = 'handinImg_' + crypto.randomUUID();
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const insertData = JSON.parse(formData.get('data'));

    try {
        if (files.length > 0) {
            const fileToStorage = files[0];
            const { data: storageData, error: storageError } = await supabase.storage.from(bucket).upload(`handin/${newFileName}`, fileToStorage);
            if (storageError) {
                return NextResponse.json({ message: 'File upload error', storageError }, { status: 500 });
            }

            const { data: storageUrlData } = supabase.storage.from(bucket).getPublicUrl(storageData.path);

            const { data: imgData, error: imgError } = await supabase.from('images')
                .insert({ type: 'handin', url: storageUrlData.publicUrl}).select();
            if (imgError) {
                return NextResponse.json({ error: imgError });
            }
    
            const { data, error } = await supabase.from('handin')
                .update(
                    {homework_id: insertData.homework_id, user_id: 'afbf8da9-baf2-4c34-ba94-49fa57b3c813', text: insertData.text, images: imgData.data.id})
                .eq('id', insertData.id);
            if (error) {
                return NextResponse.json({ message: 'File insert error1', error }, { status: 500 });
            }
            return NextResponse.json(data);
        } else {
            const { data, error } = await supabase.from('handin')
                    .update({ text: insertData.text })
                    .eq('id', insertData.id)
                    .select()
            if (error) {
                return NextResponse.json({ message: 'File insert error2', error }, { status: 500 });
            }

            return NextResponse.json(data);
        }
    } catch (err) {
        return NextResponse.json({ message: 'Error processing request', err }, { status: 500 });
    }
}