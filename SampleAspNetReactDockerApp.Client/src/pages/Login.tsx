import {useNavigate} from "react-router-dom";
import useAuthStore from "@/store/authStore.ts";
import {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";

export default function Login() {

    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);
    const isLogged = useAuthStore((state) => state.loginStatus);
    
    
    const loginActionForm = async (email: string, password: string) => {
        try {
            await login({email, password});
        } catch (error) {
            window.alert("Error: " + error);
        }
    };

    useEffect(() => {
        switch (isLogged) {
            case "authenticated":
                navigate("/dashboard");
                break;
            case "unauthenticated":
                break;
            case "pending":
                break;
            default:
                break;
        }
        
    }, [isLogged]);

    return (
        <div className="container mx-auto max-w-md p-8 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-primary mb-6">Login</h1>
            <form
                className="space-y-4"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const email = formData.get("email") as string;
                    const password = formData.get("password") as string;
                    await loginActionForm(email, password);
                }}
            >
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full px-3 py-2 bg-input border rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 block w-full px-3 py-2 bg-input border rounded-md shadow-sm"
                        required
                    />
                </div>
                <Button type="submit" 
                        variant={"outline"}
                        className="w-full">
                    Login
                </Button>
            </form>
        </div>
    );
    }