import { toHex } from "./utils";
import { networkParams } from "./config";
import { Web3Provider } from "@ethersproject/providers";
interface Props{
    provider: Web3Provider,
    network: number,
}
interface AddNetworkProps{
    provider: Web3Provider,
    network: number,
    switchError: any;
}
export const switchNetwork = async (props: Props) => {
    const { provider, network} = props;
    try {
      await provider.send(
         "wallet_switchEthereumChain",[{ chainId: toHex(network) }]
      );
    } catch (switchError: any) {
        await addNetwork({network, switchError, provider});
      }
  };
const addNetwork = async (props: AddNetworkProps) =>{
    const { provider, network, switchError } = props;
    if(switchError.code !== 4902 && switchError !== '4920') throw switchError;
    await provider.send(
        "wallet_addEthereumChain",
        [networkParams[toHex(network)]]);
}
  export default switchNetwork;