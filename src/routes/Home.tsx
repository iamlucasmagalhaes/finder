import Search from '../components/search/Search'
import { useState } from 'react'
import type { UserProps } from '../types/user';
import User from '../components/user/User'
import Error from '../components/error/Error';

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);

    const [error, setError] = useState("");

    const loadUser = async(userName: string) => {

        setError("");
        setUser(null);
        
        try {
            const res = await fetch(`https://api.github.com/users/${userName}`);

            if (res.status === 404) {
                setError("Usuário não encontrado!");
                return;
            }

            if (!res.ok) {
                setError(`Erro na API: ${res.status}`); 
                return;
            }

            const data = await res.json();

            const { avatar_url, login, location, followers, following } = data;

            const userData: UserProps = {
                avatar_url,
                login,
                location,
                followers,
                following
            };

            setUser(userData);

        } catch (error) {
            setError("Erro de conexão. Verifique sua internet.");
            console.log(error); 
        }
    }

  return (
    <div>
        <Search loadUser = {loadUser}/>
        {error && <Error msg={error} />}
        {user && <User {...user}/>}
    </div>
  )
}

export default Home