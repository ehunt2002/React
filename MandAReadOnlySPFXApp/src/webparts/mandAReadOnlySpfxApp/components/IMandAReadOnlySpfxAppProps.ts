import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMandAReadOnlySpfxAppProps {
  context: WebPartContext;
  ownersgroup: string;
  azurefunction: string;
  policylist: string;
  azurefunctionname: string;
  policyname: string;
  azurefunctionid: string;
}

export interface IAppState {
  btntext: string;
  tokenloaded: boolean;
  isadmin: boolean;
  loading: string;
}
