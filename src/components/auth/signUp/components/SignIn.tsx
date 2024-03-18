import { supabase } from "@/api/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event) => {
            if (event === "SIGNED_IN") {
                navigate("/app/tasks");
            } else if (event === "SIGNED_OUT") {
                navigate("/");
            }
        });
    }, [navigate]);

    return (
        <div className="bg-[#090e22] w-[400px] rounded-lg p-4  text-white border border-white">
            <Auth
                supabaseClient={supabase}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                inputText: "white",
                            },
                        },
                    },
                }}
                providers={[]}
            />
        </div>
    );
}
