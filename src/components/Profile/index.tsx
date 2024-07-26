import { useEffect, useRef, useState } from 'react'
import * as S from './style'
import useFileUpload from '../../hooks/useFileUpload';
import Uploading from '../../assets/imgs/uploading.svg';
import instance from '../../libs/axios/customAxios';
import { UserStore } from '../../stores/userStore';
import EditNickname from '../../assets/imgs/EditNickname.svg';
import NotificationService from '../../libs/notification/NotificationService';
const Profile = ({user,setUser}:UserStore) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editNickname, setEditNickname] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setNewAvatar] = useState("");
  const [nickname,setNickname] = useState("")

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { fileUpload, loading } = useFileUpload();

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(()=>{
    if(isModalOpen){
      if (inputRef.current) {
        inputRef.current.click();
      }
    }
  },[isModalOpen]);

  const OpenInput = () => {
    if(inputRef.current){
      inputRef.current.click();
    }
  }


  const handleFileChange = async () => {
    if (
      inputRef.current &&
      inputRef.current.files &&
      inputRef.current.files[0]
    ) {
      const albumCoverFile = inputRef.current.files[0];
      const coverUrl = await fileUpload(albumCoverFile);
      if (coverUrl) {
        setNewAvatar(coverUrl);
      }
    }
  };

  const handleNickname = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleEditNicknameArea = () => {
    setEditNickname(!editNickname);
    setEditPassword(false);
  }

  const handleEditPasswordArea = () => {
    setEditPassword(!editPassword);
    setEditNickname(false);
  };

  const submit = async () => {
    let submitNickname = user.nickname;
    let submitAvatar = user.avatarUrl;
    if(nickname.trim() !== "") {
      if(nickname.trim().length > 0 && nickname.trim().length < 4) {
        NotificationService.warn('아이디는 4글자 이상이어야 합니다.');
        return;
      }else{
        submitNickname = nickname.trim();
      }
    }
    if(avatar !== "") {
      submitAvatar = avatar;
    }
    setSubmitLoading(true);
    await instance.patch('/users/me',{
      nickname:submitNickname,
      avatarUrl:submitAvatar,
      currentPassword:password,
    }).then((res)=>{
      setUser(res.data.data);
      setIsModalOpen(false);
      setEditNickname(false);
      NotificationService.success('변경 성공');
    }).catch((err)=>{
      if (
        err.response &&
        err.response.data.code === "USER_PASSWORD_NOT_MATCH"
      ) {
        NotificationService.error("비밀번호가 틀립니다.");
      }
    }).finally(()=>{
      setSubmitLoading(false);
    });
  }

  const passwordChangeSubmit = async () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if(regex.test(newPassword)) {
      setSubmitLoading(true);
      await instance
        .patch("/users/me", {
          password:newPassword,
          currentPassword: password,
        })
        .then((res) => {
          setUser(res.data.data);
          setEditPassword(false);
          NotificationService.success("변경 성공");
        })
        .catch((err) => {
          if (
            err.response &&
            err.response.data.code === "USER_PASSWORD_NOT_MATCH"
          ) {
            NotificationService.error("비밀번호가 틀립니다.");
          }
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    }else{
      NotificationService.warn('비밀번호는 영문, 숫자, 특수문자 포함 8글자이어야 합니다.')
    }
  }


  return (
    <S.Container>
      <S.Avatar avatarUrl={user.avatarUrl}>
        <S.AvatarHover
          style={{ width: "20rem", height: "20rem" }}
          onClick={handleModal}
        >
          아바타 변경
        </S.AvatarHover>
      </S.Avatar>
      {isModalOpen ? (
        <S.AvatarEditWrap>
          <S.AvatarEdit>
            <S.AvatarPreviewWrap>
              <S.AvatarPreview
                avatarUrl={
                  !loading
                    ? avatar == ""
                      ? user.avatarUrl
                      : avatar
                    : Uploading
                }
              >
                <S.AvatarHover onClick={OpenInput}>눌러서 업로드</S.AvatarHover>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleFileChange}
                />
              </S.AvatarPreview>
              <S.EditInput
                type="password"
                placeholder="비밀번호"
                onChange={handlePassword}
              />
            </S.AvatarPreviewWrap>
            <S.AvatarControllWrap>
              <S.AvatarController
                color={submitLoading ? "#558bbd" : "#52A9F9"}
                activeColor="#558bbd"
                onClick={submit}
                disabled={loading || submitLoading}
              >
                {submitLoading ? "변경중..." : "변경"}
              </S.AvatarController>
              <S.AvatarController
                color="lightgray"
                activeColor="#ccc"
                onClick={handleModal}
                disabled={loading || submitLoading}
              >
                취소
              </S.AvatarController>
            </S.AvatarControllWrap>
          </S.AvatarEdit>
        </S.AvatarEditWrap>
      ) : null}
      <S.Nickname>
        {user.nickname}
        <img
          src={EditNickname}
          style={{ height: "3rem", cursor: "pointer" }}
          onClick={handleEditNicknameArea}
        />
      </S.Nickname>
      {editNickname ? (
        <S.EditWrap>
          <S.EditInput
            type="text"
            placeholder="새로운 닉네임"
            onChange={handleNickname}
          />
          <S.EditInput
            type="password"
            placeholder="비밀번호"
            onChange={handlePassword}
          />
          <S.EditSubmit onClick={submit} disabled={submitLoading}>
            {submitLoading ? "변경중..." : "변경"}
          </S.EditSubmit>
        </S.EditWrap>
      ) : null}
      <S.Addiction>{user.email}</S.Addiction>
      {editPassword ? (
        <S.EditWrap style={{ height: "20rem" }}>
          <S.EditInput
            type="password"
            placeholder="새로운 비밀번호"
            onChange={handleNewPassword}
          />
          <S.EditInput
            type="password"
            placeholder="비밀번호"
            onChange={handlePassword}
          />
          <S.ButtonWrap>
            <S.EditSubmit onClick={passwordChangeSubmit} disabled={submitLoading}>
              {submitLoading ? "변경중..." : "변경"}
            </S.EditSubmit>
            <S.EditSubmit
              onClick={handleEditPasswordArea}
              style={{ backgroundColor: "gray" }}
            >
              취소
            </S.EditSubmit>
          </S.ButtonWrap>
        </S.EditWrap>
      ) : (
        <S.Addiction
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={handleEditPasswordArea}
        >
          비밀번호 변경
        </S.Addiction>
      )}
    </S.Container>
  );
}

export default Profile