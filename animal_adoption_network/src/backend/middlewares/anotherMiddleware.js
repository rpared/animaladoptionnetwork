

export const anotherMiddleware=async(req,event,next) =>{

    try {
        
        console.log("trial middleware executed 2")
            
        return next();
    
        } catch (error) {
                console.log(error)
        }
       
    
}