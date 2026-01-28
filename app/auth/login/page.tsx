import { BackButton } from '@/components/common/BackButton';
import { LoginForm } from '@/components/login-form';

export default function Login() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4">
            <BackButton />

            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
}
