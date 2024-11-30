import { Response, Request } from "express";

const endpointHealth = async (req: Request, res: Response) => {
    return res.status(200).send("This is a successful request");
};

export { endpointHealth }