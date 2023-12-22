function Message(props: any) {
    return ( 
        <>
        {
            props?.message?.length > 0 && props?.message.map((item : any) => {
                return(
                    // eslint-disable-next-line react/jsx-key
                    <div className="flex items-end justify-end mb-4" key={item.message}>
                    <div className="max-w-md mx-2 bg-blue-900 text-white rounded-2xl p-4">
                        <p className="text-sm">
                            {item.message}
                        </p>
                    </div>
                    </div>
                )
            })
            
        }
        </>

     );
}

export default Message;