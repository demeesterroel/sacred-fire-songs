import Header from '@/components/common/Header';
import UploadForm from '@/components/admin/UploadForm';

export default function UploadPage() {
    return (
        <div className="min-h-screen bg-gray-950 pb-20">

            <main className="container mx-auto px-4 pt-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Upload Song</h1>
                    <p className="text-gray-400">Add a new medicine song to the circle.</p>
                </div>

                <UploadForm />
            </main>
        </div>
    );
}
