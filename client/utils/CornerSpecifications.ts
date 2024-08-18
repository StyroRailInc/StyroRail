// Enums
import { Corner, FoamWidth, CornerLength, Panel } from "@/utils/enums";

class CornerSpecifications {
  static cornerTypes = {
    [FoamWidth.FOUR]: {
      [CornerLength.FOUR]: {
        [Corner.INSIDE]: {
          upperPanel: [Panel.EIGHT],
          lowerPanel: [Panel.FOUR],
        },
        [Corner.OUTSIDE]: {
          upperPanel: [Panel.TWELVE],
          lowerPanel: [Panel.EIGHT, Panel.EIGHT],
        },
        [Corner.FORTY_FIVE_INSIDE]: {
          upperPanel: [Panel.SMALL_45],
          lowerPanel: [Panel.FOUR],
        },
        [Corner.FORTY_FIVE_OUTSIDE]: {
          upperPanel: [Panel.BIG_45],
          lowerPanel: [Panel.EIGHT],
        },
        [Corner.ONE_HUNDRED_EIGHTY]: {
          upperPanel: null,
          lowerPanel: null,
        },
        [Corner.TJOINT]: {
          upperPanel: null,
          lowerPanel: null,
        },
      },
      [CornerLength.THREE]: {
        [Corner.INSIDE]: {
          upperPanel: [Panel.SEVEN],
          lowerPanel: [Panel.THREE],
        },
        [Corner.OUTSIDE]: {
          upperPanel: [Panel.THREE, Panel.EIGHT],
          lowerPanel: [Panel.EIGHT, Panel.SEVEN],
        },
        [Corner.FORTY_FIVE_INSIDE]: {
          upperPanel: [Panel.SMALL_45],
          lowerPanel: [Panel.FOUR],
        },
        [Corner.FORTY_FIVE_OUTSIDE]: {
          upperPanel: [Panel.BIG_45],
          lowerPanel: [Panel.EIGHT],
        },
        [Corner.ONE_HUNDRED_EIGHTY]: {
          upperPanel: null,
          lowerPanel: null,
        },
        [Corner.TJOINT]: {
          upperPanel: null,
          lowerPanel: null,
        },
      },
    },
    [FoamWidth.THREE]: {
      [CornerLength.FOUR]: {
        [Corner.INSIDE]: {
          upperPanel: [Panel.SEVEN],
          lowerPanel: [Panel.FOUR],
        },
        [Corner.OUTSIDE]: {
          upperPanel: [Panel.TWELVE],
          lowerPanel: [Panel.EIGHT, Panel.SEVEN],
        },
        [Corner.FORTY_FIVE_INSIDE]: {
          upperPanel: [Panel.SMALL_45],
          lowerPanel: [Panel.FOUR],
        },
        [Corner.FORTY_FIVE_OUTSIDE]: {
          upperPanel: [Panel.BIG_45],
          lowerPanel: [Panel.EIGHT],
        },
        [Corner.ONE_HUNDRED_EIGHTY]: {
          upperPanel: null,
          lowerPanel: null,
        },
        [Corner.TJOINT]: {
          upperPanel: null,
          lowerPanel: null,
        },
      },
      [CornerLength.THREE]: {
        [Corner.INSIDE]: {
          upperPanel: [Panel.SIX],
          lowerPanel: [Panel.THREE],
        },
        [Corner.OUTSIDE]: {
          upperPanel: [Panel.THREE, Panel.EIGHT],
          lowerPanel: [Panel.SEVEN, Panel.SEVEN],
        },
        [Corner.FORTY_FIVE_INSIDE]: {
          upperPanel: [Panel.SMALL_45],
          lowerPanel: [Panel.FOUR],
        },
        [Corner.FORTY_FIVE_OUTSIDE]: {
          upperPanel: [Panel.BIG_45],
          lowerPanel: [Panel.EIGHT],
        },
        [Corner.ONE_HUNDRED_EIGHTY]: {
          upperPanel: null,
          lowerPanel: null,
        },
        [Corner.TJOINT]: {
          upperPanel: null,
          lowerPanel: null,
        },
      },
    },
  };

  corner: Corner;
  upperPanel: Panel[] | null;
  lowerPanel: Panel[] | null;

  constructor(foamWidth: FoamWidth, cornerLength: CornerLength, corner: Corner) {
    const attrs = CornerSpecifications.cornerTypes[foamWidth][cornerLength][corner];
    this.corner = corner;
    this.upperPanel = attrs.upperPanel;
    this.lowerPanel = attrs.lowerPanel;
  }
}

export default CornerSpecifications;
