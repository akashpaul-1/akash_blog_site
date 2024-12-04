let setNSP = (gameIo) => {
    console.log(`socket server listening on NameSpace : ${gameIo.name}`);
    // gameIO.use(auth.isAuthorizedSocket).on('connection',async (socket) => {

    //     /**
    //      * Connection Handler.
    //     **/
    //     console.log(`one socket connected:${socket.id} with user_id:${socket.user.user_id}`);
    //     let updateSession = await socketSessionController.updateSession(socket);//create or update socket session in Database
    //     socket.emit('connection-ack',updateSession);//Send acknowledgement to requestor

    //     /**
    //      * Socket Events For Application Logic.
    //     **/

    //     /**
    //      * Disconnection Handler.
    //     **/
    //     socket.on('disconnect',async () => {
    //         console.log(`one socket disconnected:${socket.id} with user_id:${socket.user.user_id}`);
    //     });
    // });
}



module.exports = {
    setNSP:setNSP
}