const cardano = require('@emurgo/cardano-serialization-lib-nodejs')
// import {BaseAddress} from '@emurgo/cardano-serialization-lib-browser'

function stake1_from_addr1() {
	// Build base address
	let addr = cardano.Address.from_bech32('addr1q9whnenj7f83wvqtqw756drkd85pynz2hxrxz8szd4k5yd9uxl00u6yewtjluzse4x8mpd9x0k6x6zjmtsxtaamrtyjq7f78vk')
	let base_addr = cardano.BaseAddress.from_address(addr)

	// Extract stake credential               
	let stake_cred = base_addr.stake_cred()

	// Log hex address
	console.log(Buffer.from(stake_cred.to_keyhash().to_bytes().buffer).toString("hex"))
	// bc37defe689972e5fe0a19a98fb0b4a67db46d0a5b5c0cbef7635924
	// same address in hex format.

	// Build reward address (add 0xe1 prefix to 28 last bytes of stake credential one) 
	let reward_addr_bytes = new Uint8Array(29)                                          
	reward_addr_bytes.set([0xe1], 0)                                                
	reward_addr_bytes.set(stake_cred.to_bytes().slice(4, 32), 1)           
	let reward_addr = cardano.RewardAddress.from_address(cardano.Address.from_bytes(reward_addr_bytes))

	// Log bech32 address         
	console.log(reward_addr.to_address().to_bech32())
	// stake1ux7r0hh7dzvh9e07pgv6nraskjn8mdrdpfd4cr977a34jfquwqrj9
}

stake1_from_addr1()