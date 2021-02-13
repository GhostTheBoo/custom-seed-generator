import { useState, useEffect } from "react"

export function useReward() {
	const [reward, setReward] = useState(0)
	const [rewardType, setRewardType] = useState(0)

	return [reward, setReward]
}