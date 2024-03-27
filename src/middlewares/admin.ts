import{ Request, Response, NextFunction } from 'express';
 const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Instead of this we will use req.user
    const user= req.body.user;
    if(user?.role !== 'ADMIN'){
        return res.status(403).json({
            success: false,
            message: 'You are not authorised to perform this action'
        })
    }
    next();
 }