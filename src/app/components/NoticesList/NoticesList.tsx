import { useState } from "react";
import type { Notice } from "../../../services/types/notices";
import { useAuth } from "../../../context/useAuth";
import NoticesItem from "../NoticesItem/NoticesItem";
import ModalAttention from "../ModalAttention/ModalAttention";
import ModalNotice from "../ModalNotice/ModalNotice";
import css from "./NoticesList.module.css";

interface NoticesListProps {
  notices: Notice[];
}

export default function NoticesList({ notices }: NoticesListProps) {
  const { isAuthenticated } = useAuth();
  const [isAttentionModalOpen, setIsAttentionModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const handleAuthAction = () => {
    if (!isAuthenticated) {
      setIsAttentionModalOpen(true);
      return false;
    }
    return true;
  };

  const handleLearnMore = (notice: Notice) => {
    if (!isAuthenticated) {
      setIsAttentionModalOpen(true);
      return;
    }
    setSelectedNotice(notice);
    setIsNoticeModalOpen(true);
  };

  const closeAttentionModal = () => {
    setIsAttentionModalOpen(false);
  };

  const closeNoticeModal = () => {
    setIsNoticeModalOpen(false);
    setSelectedNotice(null);
  };

  if (!notices || notices.length === 0) {
    return (
      <div className={css.emptyState}>
        <p className={css.emptyText}>No notices found</p>
      </div>
    );
  }

  return (
    <>
      <ul className={css.noticesList}>
        {notices.map((notice) => (
          <NoticesItem
            key={notice._id}
            notice={notice}
            onAuthAction={handleAuthAction}
            onLearnMore={handleLearnMore}
          />
        ))}
      </ul>
      <ModalAttention
        isOpen={isAttentionModalOpen}
        onClose={closeAttentionModal}
      />
      <ModalNotice
        isOpen={isNoticeModalOpen}
        onClose={closeNoticeModal}
        notice={selectedNotice}
      />
    </>
  );
}
