import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { EditProfileDropdown } from "../components/DotDropdown";
import { useCurrentUser } from "./CurrentUserContext";


const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
      pageProfile: { results: [] },
    });

    const currentUser = useCurrentUser();

    const handleFollow = async (targetProfile) => {
      try {
        const { data } = await axiosRes.post('/followers/', {
          followed: targetProfile.id,
        });

        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: {
            results: prevState.pageProfile.results.map((profile) => {
              return profile.id === targetProfile.id
              ? {
                ...profile,
                followers_count: profile.followers_count + 1,
                following_id: data.id
              }
              : profile.is_owner
              ? {
                ...profile,
                following_count: EditProfileDropdown.following_count +1,
              }
              : profile;
            }),
          },
        }));
      } catch (err) {
        // console.log(err)
      }
    };

    const handleUnfollow = async (targetProfile) => {
      try {
        await axiosRes.delete(`/followers/${targetProfile.following_id}/`);

        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: {
            results: prevState.pageProfile.results.map((profile) => {
              return profile.id === targetProfile.id
              ? {
                ...profile,
                followers_count: profile.followers_count - 1,
                following_id: null,
              }
              : profile.is_owner
              ? {
                ...profile,
                following_count: EditProfileDropdown.following_count - 1,
              }
              : profile;
            }),
          },
        }));
      } catch (err) {
        // console.log(err)
      }
    };

    useEffect(() => {
        const handleMount = async () => {
          try {
            const { data } = await axiosReq.get('/profiles/?ordering=-followers_count');
            setProfileData((prevState) => ({
              ...prevState,
              popularProfiles: data,
            }));
          } catch (err) {
            // console.log(err);
          }
        };
    
        handleMount();
      }, [currentUser]);

    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={{setProfileData, handleFollow, handleUnfollow}}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};