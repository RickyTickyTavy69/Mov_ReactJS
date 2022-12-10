const useRequest = () => {

    const request = async (url) => {

        try{
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok){
                throw new Error("Fehler bei der Api Anfrage");
            }
            return data;
        }catch(error){
            console.error(error, "Es ist ein Fehler aufgetreten...");
        }

    }

    return request;

}

export default useRequest;