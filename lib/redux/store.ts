import {
  configureStore,
  createSelector,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Action, combineReducers } from "redux";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  useStore as baseUseStore,
  TypedUseSelectorHook,
} from "react-redux";
import logger from "redux-logger";

// System model
interface SystemData {
  source: string;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

interface SystemState {
  data: SystemData | null;
}

const initialSystemState: SystemState = {
  data: null,
};

// System slice
const systemSlice = createSlice({
  name: "system",
  initialState: initialSystemState,
  reducers: {
    systemLoaded(state, { payload }: PayloadAction<SystemState>) {
      state.data = payload.data;
    },
  },
});

// Subject page model
interface SubjectPageData {
  id: string;
  name: string;
  stateTimestamp: number;
}

interface SubjectPageState {
  data: SubjectPageData | null;
}

const subjectPageInitialState: SubjectPageState = {
  data: null,
};

// Subject page slice
const subjectPageSlice = createSlice({
  name: "subjectPage",
  initialState: subjectPageInitialState,
  reducers: {
    subjectPageLoaded(state, { payload }: PayloadAction<SubjectPageState>) {
      state.data = payload.data;
    },
  },
});

// Detail page model
interface DetailPageData {
  id: string | null;
  summary: string | null;
  stateTimestamp: number | null;
}

interface DetailPageState {
  data: DetailPageData | null;
}

const detailPageInitialState: DetailPageState = {
  data: {
    id: null,
    summary: null,
    stateTimestamp: null,
  },
};

// Detail page slice
const detailPageSlice = createSlice({
  name: "detailPage",
  initialState: detailPageInitialState,
  reducers: {
    detailPageLoaded(state, { payload }: PayloadAction<DetailPageState>) {
      state.data = payload.data;
    },
  },
});

// Gipp page model
interface GippPageData {
  id: string | null;
  testData: string | null;
  stateTimestamp: number | null;
}

interface GippPageState {
  data: GippPageData | null;
}

const gippPageInitialState: GippPageState = {
  data: {
    id: null,
    testData: null,
    stateTimestamp: null,
  },
};

// Gipp page slice
const gippPageSlice = createSlice({
  name: "gippPage",
  initialState: gippPageInitialState,
  reducers: {
    gippPageLoaded(state, { payload }: PayloadAction<GippPageState>) {
      state.data = payload.data;
    },
  },
});

interface Pokemon {
  name: string;
}

// API slice
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `/pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;

// Combine reducers
const rootReducer = combineReducers({
  [subjectPageSlice.name]: subjectPageSlice.reducer,
  [detailPageSlice.name]: detailPageSlice.reducer,
  [gippPageSlice.name]: gippPageSlice.reducer,
  [systemSlice.name]: systemSlice.reducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

// Store configuration
const makeStore: MakeStore<any> = ({ reduxWrapperMiddleware }: any) =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(
          process.browser ? logger : [],
          pokemonApi.middleware,
          reduxWrapperMiddleware
        )
        .filter(Boolean) as any,
  });

type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

// Hooks for usage in components
export const useStore = () => baseUseStore<AppState, AppDispatch>();
export const useDispatch = () => useDispatchBase<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useSelectorBase;

// System thunk
export const fetchSystem = (): AppThunk => async (dispatch) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  dispatch(systemSlice.actions.systemLoaded({ data: { source: "GIAP" } }));
};

// Subject page thunk
export const fetchSubject =
  (id: string): AppThunk =>
  async (dispatch) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    dispatch(
      subjectPageSlice.actions.subjectPageLoaded({
        data: { id, name: `Subject ${id}`, stateTimestamp: Date.now() },
      })
    );
  };

// Detail page thunk
export const fetchDetail =
  (id: string): AppThunk =>
  async (dispatch) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    dispatch(
      detailPageSlice.actions.detailPageLoaded({
        data: {
          id,
          summary: `This is the summary for the page with id ${id}`,
          stateTimestamp: Date.now(),
        },
      })
    );
  };

// Gipp page thunk
export const fetchGipp = (): AppThunk => async (dispatch) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  dispatch(
    gippPageSlice.actions.gippPageLoaded({
      data: {
        id: "gippId",
        testData: "This is the test data for the gipp page",
        stateTimestamp: Date.now(),
      },
    })
  );
};

// Selectors
const systemSliceSelector = (state: AppState): SystemState => state.system;
const selectSystemData = createSelector(systemSliceSelector, (s) => s.data);
export const selectSystemSource = createSelector(
  selectSystemData,
  (s) => s?.source
);

const subjectPageSliceSelector = (state: AppState): SubjectPageState =>
  state.subjectPage;
const selectSubjectPageData = createSelector(
  subjectPageSliceSelector,
  (s) => s?.data
);
export const selectSubjectPageId = createSelector(
  selectSubjectPageData,
  (s) => s?.id
);
export const selectSubjectPageStateTimestamp = createSelector(
  selectSubjectPageData,
  (s) => s?.stateTimestamp
);
export const selectSubjectPageName = createSelector(
  selectSubjectPageData,
  (s) => s?.name
);

const detailPageSliceSelector = (state: AppState): DetailPageState =>
  state.detailPage;
export const selectDetailPageData = createSelector(
  detailPageSliceSelector,
  (s) => s?.data
);
export const selectDetailPageId = createSelector(
  selectDetailPageData,
  (s) => s?.id
);
export const selectDetailPageStateTimestamp = createSelector(
  selectDetailPageData,
  (s) => s?.stateTimestamp
);
export const selectDetailPageSummary = createSelector(
  selectDetailPageData,
  (s) => s?.summary
);

const gippPageSliceSelector = (state: AppState): GippPageState =>
  state.gippPage;
export const selectGippPageData = createSelector(
  gippPageSliceSelector,
  (s) => s?.data
);
export const selectGippPageId = createSelector(
  selectGippPageData,
  (s) => s?.id
);
export const selectGippPageStateTimestamp = createSelector(
  selectGippPageData,
  (s) => s?.stateTimestamp
);
export const selectGippPageTestData = createSelector(
  selectGippPageData,
  (s) => s?.testData
);
