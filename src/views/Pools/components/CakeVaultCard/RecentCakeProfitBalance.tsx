import React from 'react'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { convertSharesToCake } from '../../helpers'
import { Text, useTooltip } from '../../../../components/Pancakeswap/uikit/src'

interface RecentCakeProfitBalanceProps {
  cakeAtLastUserAction: BigNumber
  userShares: BigNumber
  pricePerFullShare: BigNumber
}

const RecentCakeProfitBalance: React.FC<RecentCakeProfitBalanceProps> = ({
  cakeAtLastUserAction,
  userShares,
  pricePerFullShare,
}) => {
  const currentSharesAsCake = convertSharesToCake(userShares, pricePerFullShare)
  const cakeProfit = currentSharesAsCake.cakeAsBigNumber.minus(cakeAtLastUserAction)
  const cakeToDisplay = cakeProfit.gte(0) ? getFullDisplayBalance(cakeProfit, 18, 5) : '0'

  const TranslateString = useI18n()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    TranslateString(999, 'Your estimated earnings since last manual stake or unstake:'),
    'bottom-end',
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <Text ref={targetRef} fontSize="14px">
        {cakeToDisplay}
      </Text>
    </>
  )
}

export default RecentCakeProfitBalance
