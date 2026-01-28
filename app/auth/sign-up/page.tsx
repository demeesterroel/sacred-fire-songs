import { BackButton } from '@/components/common/BackButton';
import { SignUpForm } from '@/components/sign-up-form';

export default function SignUp() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4">
            <BackButton />

            <div className="w-full max-w-md">
                <SignUpForm />
            </div>
        </div>
    );
}
