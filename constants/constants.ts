// Enums
import { Panel, Corner } from "@/utils/enums";

const Constants = {
  // App size constants
  APP_SCREEN_WIDTH_PERCENTAGE: 0.9,
  SCROLLVIEW_WIDTH_PERCENTAGE: 1,
  APP_MAX_WIDTH: 900,
  APP_BASE_WIDTH: 320,

  // Text size multiplier constants
  FONT_SIZE: 11,
  TITLE_SIZE: 24,

  // Text size constants
  MIN_FONT_SIZE: 12,
  MAX_FONT_SIZE: 18,
  MIN_TITLE_SIZE: 28,
  MAX_TITLE_SIZE: 42,

  // Image constants
  IMAGE_SIZE: 12,
  ARROW_SIZE: 12,
  MIN_ARROW_SIZE: 16,
  MAX_IMAGE_SIZE: 25,
  GEAR_SIZE: 12,
  MIN_GEAR_SIZE: 25,
  MAX_GEAR_SIZE: 30,
  MIN_REMOVE_SIZE: 17,
  MAX_REMOVE_SIZE: 19,
  UP_ARROW_SIZE: 16,

  // Icon constants
  MIN_PLUS_ICON_SIZE: 16,

  // Input Constants
  INPUT_HEIGHT_ADJUSTMENT_FACTOR: 1.8,

  // Settings constants
  MAX_MODAL_WIDTH: 600,

  // CheckBox constants
  MAX_CHECKMARK_SIZE: 24,
  MIN_CHECKMARK_SIZE: 18,
  CHECKBOX_PADDING: 2,

  // Line drawer constants
  IS_SMALL_SCREEN: 615,
  MAX_LENGTH_DIVIDOR: 3,
  MAX_DRAWING_WINDOW_HEIGHT: 350,
  DRAWING_WINDOW_SCREEN_HEIGHT_PERCENTAGE: 0.7,
  DRAWING_HEIGHT_PADDING: 40,
  DRAWING_SCALE_DIVIDOR: 1.4,
  EULER_PATH_MARGIN_ERROR: 5,
  CIRCLE_RADIUS: 3,
  SMALL_STROKE_WIDTH: "1",
  REGULAR_STROKE_WIDTH: "1.25",
  TEXT_OFFSET: -10,

  // TJoints constants
  N_WALLS_PER_T_JOINT: 3,
  T_JOINT_WIDTH_INCHES: 8,

  // Opacity constants
  NO_OPACITY: 0,
  HALF_OPACITY: 0.5,
  FULL_OPACITY: 1,

  // Panel constants
  PANEL_LENGTHS: ['24"', '16"', '12"', '8"', '7"', '6"', '4"', '3"', '2"', "Petit 45", "Grand 45"],
  PANEL_INDEX: {
    [Panel.TWENTY_FOUR]: 0,
    [Panel.SIXTEEN]: 1,
    [Panel.TWELVE]: 2,
    [Panel.EIGHT]: 3,
    [Panel.SEVEN]: 4,
    [Panel.SIX]: 5,
    [Panel.FOUR]: 6,
    [Panel.THREE]: 7,
    [Panel.TWO]: 8,
    [Panel.SMALL_45]: 9,
    [Panel.BIG_45]: 10,
  },

  // Elastics Constant
  N_ELASTICS_PER_CORNER: 6,

  // Bundle constants
  TWENTY_FOUR_BUNDLE_SIZE: 2,
  SIXTEEN_BUNDLE_SIZE: 4,
  TWELVE_BUNDLE_SIZE: 4,
  EIGHT_BUNDLE_SIZE: 4,
  SEVEN_BUNDLE_SIZE: 4,
  SIX_BUNDLE_SIZE: 4,
  FOUR_BUNDLE_SIZE: 3,
  THREE_BUNDLE_SIZE: 4,
  TWO_BUNDLE_SIZE: 6,

  // Panel Lengths constants
  TWENTY_FOUR_PANEL_LENGTH: 24,
  SIXTEEN_PANEL_LENGTH: 16,
  TWELVE_PANEL_LENGTH: 12,
  EIGHT_PANEL_LENGTHL: 8,
  SEVEN_PANEL_LENGTH: 7,
  SIX_PANEL_LENGTH: 6,
  FOUR_PANEL_LENGTH: 4,
  THREE_PANEL_LENGTH: 3,
  TWO_PANEL_LENGTH: 2,

  // Settings Constants
  DEFAULT_WALL_HEIGHT: "8'",
  DEFAULT_CONCRETE_WIDTH: '8"',
  PERCENTAGE_EXTRA_MIN: "5",

  // Animations constants
  FADE_IN_DURATION_MS: 500,
  WALL_ROW_ANIMATION_DURATION_MS: 1000,
  NO_OFFSET: 0,
  DAMPING: 20,
  STIFFNESS: 100,
  OFFSET: 30,
  NEGATIVE_OFFSET: -30,
  FULL_SCALE: 1,
  LARGE_SCALE: 1.2,
  MEDIUM_SCALE: 1.07,

  // Math constants
  N_INCHES_IN_FOOT: 12,
  ANGLE_ADJUSTMENT_FACTOR: 2.4169,

  // SR.FSimplified constants
  FILLERS_PERCENTAGE: "15",
  CORNER_INDEX: {
    [Corner.INSIDE]: 1,
    [Corner.OUTSIDE]: 2,
    [Corner.FORTY_FIVE_INSIDE]: 3,
    [Corner.FORTY_FIVE_OUTSIDE]: 4,
    [Corner.TJOINT]: 5,
  },

  // Quadratic constants when corners > 0
  a: 42.8122228744893,
  b: 0.00975081384251042,
  c: 8.178878461949356,

  // Quadratic when corners == 0
  a2: 0.17174158107952697,
  b2: 43.0571310395973,

  // Floor Constants
  N_PANELS_PER_HYDROPEX_BUNDLE: 6,
  N_PANELS_PER_SRP_BUNDLE: 8,
  PANEL_SURFACE_INCHES: 4608, // 4' * 8'

  // Routing constants
  SEND_EMAIL_URL: "https://kjauzq7gpk.execute-api.us-east-2.amazonaws.com/prod",
  FORMWORKER_DYNAMODB_URL: "https://41fsvv1g6b.execute-api.us-east-2.amazonaws.com/prod",

  // BB constants
  OPENING_MULTIPLIER: 0.8,
};

export default Constants;
