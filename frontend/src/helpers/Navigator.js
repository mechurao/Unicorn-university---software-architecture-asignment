import { useNavigate } from 'react-router-dom';

export function Navigator() {
    const navigate = useNavigate();

    const openSignIn = () => navigate("/sign-in");
    const openSignUp = () => navigate("/sign-up");

    return { openSignIn, openSignUp };
}
