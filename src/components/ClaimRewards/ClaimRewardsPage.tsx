import React from "react";
import { useAccount, useConnect } from "wagmi";
import containerStyles from "../../Container.module.scss";
import styles from "./ClaimRewards.module.scss";
import { Oval } from "react-loader-spinner";
import { ReactComponent as WalletCraditCard } from "../../assets/svg/walletCreditCardIcon.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import { SubTitle } from "../SubTitle/SubTitle";
import { Button } from "../../shared/Button/Button";
import { Form } from "../Form/ClaimRewardsForm";
import { connectWallet } from "../../shared/utils/connectWallet";
import { formatted } from "../../shared/utils/formatUnits";
import { useReward } from "../../hooks/contracts-api";

export const ClaimReawardsPage = () => {
  const { isConnected, isConnecting } = useAccount();
  const { connect, error } = useConnect();

  const { data: rewardData } = useReward();
  const rewardsAvailable = formatted(rewardData).toFixed(0);

  return (
    <div className={`${containerStyles.container} ${styles.claimWrapper}`}>
      {!isConnected ? (
        <>
          <div className={styles.container}>
            <div className={styles.iconWrapper}>
              <WalletCraditCard />
              <CrossIcon className={styles.icon} />
            </div>
            <SubTitle
              className={styles.subTitle}
              text="To start staking you need to connect you wallet first"
            />
          </div>
          <Button
            disabled={isConnecting}
            onClick={() => connectWallet({ connect, error })}
            type="button"
          >
            {isConnecting ? (
              <Oval
                ariaLabel="loading-indicator"
                height={32}
                width={32}
                strokeWidth={2}
                strokeWidthSecondary={1}
                color="blue"
                secondaryColor="white"
              />
            ) : (
              <span>Connect Wallet</span>
            )}
          </Button>
        </>
      ) : (
        <Form rewards={rewardsAvailable} />
      )}
    </div>
  );
};
