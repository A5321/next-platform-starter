import { currentRelationshipProtocols } from "./currentRelationship";
import { youAreAnOptionProtocols } from "./youAreAnOption";
import { mixedSignalsProtocols } from "./mixedSignals";
import { repeatingBreakupProtocols } from "./repeatingBreakup";
import { thirdPersonGreyZoneProtocols } from "./thirdPersonGreyZone";
import { trustTheirSignalsProtocols } from "./trustTheirSignals";
import { afterBreachOfTrustProtocols } from "./afterBreachOfTrust";
import { silentExitProtocols } from "./silentExit";
import { hyperControllingParentProtocols } from "./hyperControllingParent";

export const protocolsByScope = {
  "current-relationship": currentRelationshipProtocols,
  "you-are-an-option": youAreAnOptionProtocols,
  "mixed-signals": mixedSignalsProtocols,
  "repeating-breakup": repeatingBreakupProtocols,
  "third-person-grey-zone": thirdPersonGreyZoneProtocols,
  "trust-their-signals": trustTheirSignalsProtocols,
  "after-breach-of-trust": afterBreachOfTrustProtocols,
  "silent-exit": silentExitProtocols,
  "hyper-controlling-parent": hyperControllingParentProtocols,
};
