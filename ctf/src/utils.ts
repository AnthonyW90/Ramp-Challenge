import { useState } from "react";

export function useFetchFlag(url: string){
    const [flag, setFlag] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    fetch(url)
        .then((res) => res.text())
        .then((data) => {
            setFlag(data.trim());
        })
        .catch((err) => {
            setError(err.message);
        });

    return { flag, error };
}

// I would have put this into an env variable to protect challenge secretes but that requires a 'devbox' which seemed to have slow startup time and was pretty inconsistent.