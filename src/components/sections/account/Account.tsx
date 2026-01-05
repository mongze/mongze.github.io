import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, ChevronDown } from "lucide-react";
import { Section, Toast } from "../../common";
import type { AccountInfo } from "../../../types";
import "./Account.scss";

interface AccountProps {
  accounts: AccountInfo[];
}

export const Account = ({ accounts }: AccountProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const groomAccounts = accounts.filter((acc) => acc.type.startsWith("groom"));
  const brideAccounts = accounts.filter((acc) => acc.type.startsWith("bride"));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const getAccountLabel = (type: AccountInfo["type"]) => {
    const labels: Record<AccountInfo["type"], string> = {
      groom: "신랑",
      bride: "신부",
      "groom-father": "신랑 아버지",
      "groom-mother": "신랑 어머니",
      "bride-father": "신부 아버지",
      "bride-mother": "신부 어머니",
    };
    return labels[type];
  };

  const renderAccountGroup = (
    accountList: AccountInfo[],
    title: string,
    id: string
  ) => {
    const isOpen = openAccordion === id;

    return (
      <div
        className={`account__accordion ${
          isOpen ? "account__accordion--open" : ""
        }`}
      >
        <button
          className="account__accordion-trigger"
          onClick={() => toggleAccordion(id)}
        >
          <span>{title}</span>
          <ChevronDown
            size={16}
            className={`account__accordion-icon ${
              isOpen ? "account__accordion-icon--open" : ""
            }`}
          />
        </button>

        <div
          className={`account__accordion-content ${
            isOpen ? "account__accordion-content--open" : ""
          }`}
        >
          <div className="account__accordion-inner">
            {accountList.map((account, index) => {
              const accountId = `${account.type}-${index}`;
              const accountNumber = account.accountNumber.replace(/\s/g, "");

              return (
                <motion.div
                  key={accountId}
                  className="account__item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <div className="account__item-header">
                    <span className="account__label">
                      {getAccountLabel(account.type)}
                    </span>
                    <span className="account__name">{account.name}</span>
                  </div>

                  <button
                    className="account__copy-button"
                    onClick={() => copyToClipboard(accountNumber)}
                  >
                    <div className="account__copy-info">
                      <div className="account__bank">{account.bank}</div>
                      <div className="account__number">
                        {account.accountNumber}
                      </div>
                    </div>
                    <Copy size={20} className="account__copy-icon" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section className="account" backgroundColor="#ecb3be">
      <motion.div
        className="account__content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="account__title">마음 전하실 곳</h2>

        <p className="account__description">
          참석이 어려우신 분들을 위해
          <br />
          계좌번호를 기재하였습니다.
          <br />
          너그러운 마음으로 양해 부탁드립니다.
        </p>

        <div className="account__groups">
          {groomAccounts.length > 0 &&
            renderAccountGroup(groomAccounts, "신랑측에게", "groom")}
          {brideAccounts.length > 0 &&
            renderAccountGroup(brideAccounts, "신부측에게", "bride")}
        </div>
      </motion.div>

      <Toast
        message="복사되었습니다"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </Section>
  );
};
