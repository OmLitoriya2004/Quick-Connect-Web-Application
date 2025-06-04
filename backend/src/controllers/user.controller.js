import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js"

export async function getRecommendedUsers(req, res) {

    try {
        const currUserID=req.user.id;
        const currUser=req.user;
        const recommendedUsers=await User.find({
            $and:[
                {
                    _id:{$ne:currUserID},
                },
                {
                    _id:{$nin:currUser.friends},
                },
                {
                    isOnboarder:true,
                }
            ]
        });
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error in getRecommendation controller",error.message);
        res.status(500).json({message:"Internal server error"})
    }

}

export async function getMyFriends(req, res) {
    try {
        const user=await User.findById(req.user.id).select("friends")
        .populate("friends","fullName profilePic nativeLanguage learningLanguage");
        
        res.status(200).json(user.friends);

    } catch (error) {
        console.error("Error in getRecommendation controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}

export async function sendFriendRequest(req,res) {
    try {
      const myId = req.user.id;
      const { id: recepientID } = req.params;
      if (myId == recepientID) {
        return res
          .status(400)
          .json({ message: "You can not send friend request to yourself" });
      }
      const recepient = await User.findById(recepientID);
      if (!recepient) {
        return res.status(404).json({ message: "Recepient not found" });
      }
      if (recepient.friends.includes(myId)) {
        return res.status(400).json({ message: "User is already your friend" });
      }

      const existingRequest = await FriendRequest.findOne({
        $or: [
          { sender: myId, recipient: recepientID },
          { sender: recepientID, recipient: myId },
        ],
      });
      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "-Already sent a friend request-" });
      }
      const friendRequest = await FriendRequest.create({
        sender: myId,
        recipient: recepientID,
      });
      res.status(201).json(friendRequest);
    } catch (error) {
      console.log("Error in Sendingfriendrequest controller ", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
}

export async function acceptFriendRequest(req,res) {
    try {
      const { id: requestId } = req.params;
      const friendRequest = await FriendRequest.findById(requestId);
      if (!friendRequest) {
        return res.status(404).json({ message: "Friend request not found" });
      }
      if (friendRequest.recipient.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "You are not authorized to accept this request " });
      }
      friendRequest.status = "accepted";
      await friendRequest.save();

      await User.findByIdAndUpdate(friendRequest.sender, {
        $addToSet: { friends: friendRequest.recipient },
      });
      await User.findByIdAndUpdate(friendRequest.recipient, {
        $addToSet: { friends: friendRequest.sender },
      });
      res.status(200).json({ message: "Friend request accepted" });
    } catch (error) {
      console.error("Error in acceptingFriendRequest controller", error);
      res.status(500).json({ message: "Internal server error" });
    }
}

export async function getFriendRequests(req,res) {
    try {
        const incomingReqs=await FriendRequest.find({
            recipient:req.user.id,
            status:"pending",
        }).populate("sender","fullName profilePic nativeLanguage learningLanguage");

        const acceptedReqs = await FriendRequest.find({
          sender: req.user.id,
          status: "accepted",
        }).populate("recipient", "fullName profilePic");
        
        res.status(200).json({ incomingReqs,acceptedReqs});
    } catch (error) {
        console.error("Error in getFriendRequests controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getOutgoingFriendReqs(req,res) {
    try {
      const outgoingReqs = await FriendRequest.find({
        sender: req.user.id,
        status: "pending",
      }).populate(
        "recipient",
        "fullName profilePic nativeLanguage learningLanguage"
      );
      res.status(200).json(outgoingReqs);
    } catch (error) {
      console.error("Error in getOutgoingReqs controller", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
}