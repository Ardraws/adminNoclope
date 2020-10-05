import _ from 'lodash'
import React from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import { Search } from 'semantic-ui-react';
import { HorizontalBar, Bar, Chart, Pie, Doughnut, Line } from 'react-chartjs-2';

Chart.Legend.prototype.afterFit = function() {
  this.height = this.height + this.height*(50/100);
};

const source = [
    {
      title: 'Parité Homme/Femme (en %)',
      description: '',
      price: '',
      anchor: 'parity'
    },
    {
      title: 'Répartition des âges',
      description: '',
      price: '',
      anchor: 'ages'
    },
    {
      title: `Rapport des différents objectifs d'arrêt`,
      description: '',
      price: '',
      anchor: 'objectives'
    },
    {
      title: 'Budget',
      description: '',
      price: '',
      anchor: 'budget'
    },
    {
      title: 'Nombre de connexions par jour sur l’application et par mois',
      description: '',
      price: '',
      anchor: 'signin'
    },
    {
      title: `Nombre d'inscriptions par jour sur l’application et par mois`,
      description: '',
      price: '',
      anchor: 'signup'
    },
    {
      title: 'Nombre de cigarettes fumées par jour (en %)',
      description: '',
      price: '',
      anchor: 'cigs'
    },
    {
      title: 'Nombre d’ange gardien moyen par inscrit (en %)',
      description: '',
      price: '',
      anchor: 'keepers'
    },
  ]
  
  const initialState = {
    loading: false,
    results: [],
    value: '',
  }
  
  function exampleReducer(state, action) {
    switch (action.type) {
      case 'CLEAN_QUERY':
        return initialState
      case 'START_SEARCH':
        return { ...state, loading: true, value: action.query }
      case 'FINISH_SEARCH':
        return { ...state, loading: false, results: action.results }
      case 'UPDATE_SELECTION':
        return { ...state, value: action.selection }
  
      default:
        throw new Error()
    }
}

function Metrics() {
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value } = state
  
    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
      clearTimeout(timeoutRef.current)
      dispatch({ type: 'START_SEARCH', query: data.value })
  
      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: 'CLEAN_QUERY' })
          return
        }
  
        const re = new RegExp(_.escapeRegExp(data.value), 'i')
        const isMatch = (result) => re.test(result.title)
  
        dispatch({
          type: 'FINISH_SEARCH',
          results: _.filter(source, isMatch),
        })
      }, 300)
    }, [])
    React.useEffect(() => {
      return () => {
        clearTimeout(timeoutRef.current)
      }
    }, [])
    if(API.isAuth) {
        return (
            <div className="w-full xl:px-32 px-6 pt-20">
                <Search
                    placeholder="Rechercher un indicateur"
                    className="my-12"
                    input={{ fluid: true }}
                    size="huge"
                    loading={loading}
                    onResultSelect={(e, data) =>
                      { dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
                        console.log(data.result)
                        var ele = document.getElementById(data.result.anchor);   
                        window.scrollTo(ele.offsetLeft,ele.offsetTop - 80);
                      }
                    }
                    onSearchChange={handleSearchChange}
                    results={results}
                    value={value}
                />
                <div id="parity" className="shadow-lg w-full py-4 px-6 bg-white rounded-md border mb-12">
                  <p className="text-2xl font-bold">
                    Parité Homme/Femme (en %)
                  </p>
                  <div style={{height: "450px"}}>
                    <Pie
                        data={{
                          labels: [
                              'Hommme %',
                              'Femme %'
                          ],
                            datasets: [
                                {
                                    data: [44, 56],
                                    backgroundColor: ["#31D0B5", "#27AB95"]
                                },
                            ]               
                        }}
                        options={{
                          responsive:true,
                          maintainAspectRatio: false,
                          plugins: { datalabels: { display: true, color: "black", anchor: "center", align: "center", font: {size: 30}}},
                        }}
                      />
                  </div>
                </div>
                <div id="ages" className="shadow-lg w-full py-4 px-6 bg-white rounded-md border mb-12">
                  <p className="text-2xl font-bold">
                    Répartition des âges
                  </p>
                  <div style={{height: "450px"}}>
                    <Doughnut
                        data={{
                          labels: [
                              '18/24ans',
                              '25/30ans',
                              '31/40ans',
                              '41/50ans',
                              '+50ans'
                          ],
                            datasets: [
                                {
                                    data: [34,22,18,8,3],
                                    backgroundColor: ["#00F3D1", "#31D0B5", "#27AB95", "#10685A", "#0A4138"]
                                },
                            ]               
                        }}
                        options={{
                          responsive:true,
                          maintainAspectRatio: false,
                          plugins: { datalabels: { display: true, color: "black", anchor: "center", align: "center", font: {size: 20}}},
                        }}
                      />
                  </div>
                </div>
                <div id="objectives" className="shadow-lg w-full py-4 px-6 bg-white rounded-md border mb-12">
                  <p className="text-2xl font-bold">
                    Rapport des différents objectifs d'arrêt
                  </p>
                  <div style={{height: "450px"}}>
                    <Bar
                        data={{
                          labels: [
                              'Voyage',
                              'Multimédia',
                              'Voiture',
                              'Nouveau né',
                              'Tertiaire',
                              'Autres'
                          ],
                            datasets: [
                                {
                                    data: [80, 120, 42, 12, 31, 60],
                                    backgroundColor: "#31D0B5"
                                },
                            ]               
                        }}
                        options={{
                          legend: {display: false},
                          responsive:true,
                          maintainAspectRatio: false,
                          plugins: { datalabels: { display: true, color: "white", anchor: "center", align: "center", font: {size: 15}}},
                          scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true,
                                    min: 0  
                                }
                              }]
                          }
                        }}
                      />
                  </div>
                </div>
                <div id="budget" className="shadow-lg w-full py-4 px-6 bg-white rounded-md border mb-12">
                  <p className="text-2xl font-bold">
                    Budget
                  </p>
                  <div style={{height: "450px"}}>
                    <HorizontalBar
                        data={{
                          labels: [
                              '-100 €',
                              '100 - 300 €',
                              '300 - 500 €',
                              '500 - 1 000 €',
                              '1 000 - 2 000 €',
                              '2 000 - 5 000 €',
                              '5 000 - 10 000 €',
                              '+10 000 €'
                          ],
                            datasets: [
                                {
                                    data: [
                                      250,
                                      380,
                                      160,
                                      80,
                                      60,
                                      42,
                                      24,
                                      10
                                    ],
                                    backgroundColor: "#31D0B5"
                                },
                            ],             
                        }}
                        options={{
                          responsive:true,
                          maintainAspectRatio: false,
                          legend: {display: false},
                          plugins: { datalabels: { display: true, color: "white", anchor: "center", align: "center", font: {size: 15}}},
                        }}
                      />
                  </div>
                </div>
                <div id="signin" className="shadow-lg w-full py-4 px-6 bg-white rounded-md border mb-12">
                  <p className="text-2xl font-bold">
                    Nombre de connexions par jour sur l’application et par mois
                  </p>
                  <div style={{height: "450px"}}>
                    <Line
                        data={{
                          labels: [
                            'Janvier',
                            'Fevrier',
                            'Mars',
                            'Avril',
                            'Mai',
                            'Juin',
                            'Juillet',
                            'Août',
                            'Septembre',
                            'Octobre',
                            'Novembre',
                            'Décembre'
                        ],
                            datasets: [
                                {
                                    data: [44, 56, 60, 42, 24, 12, 18, 54, 42, 24, 66, 12],
                                    backgroundColor: "#31D0B5", 
                                    fill: false
                                },
                            ]               
                        }}
                        options={{
                          responsive:true,
                          maintainAspectRatio: false,
                          legend: { display: false },
                          plugins: { datalabels: { display: true, color: "black", anchor: "center", align: "center", font: {size: 0}}},
                          scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true,
                                    min: 0  
                                }
                              }]
                          }
                        }}
                      />
                  </div>
                </div>
                <div id="signup" className="shadow-lg w-full py-4 px-6 bg-white rounded-md border mb-12">
                  <p className="text-2xl font-bold">
                    Nombre d'inscriptions par jour sur l’application et par mois
                  </p>
                  <div style={{height: "450px"}}>
                    <Line
                        data={{
                          labels: [
                              'Janvier',
                              'Fevrier',
                              'Mars',
                              'Avril',
                              'Mai',
                              'Juin',
                              'Juillet',
                              'Août',
                              'Septembre',
                              'Octobre',
                              'Novembre',
                              'Décembre'
                          ],
                            datasets: [
                                {
                                    data: [44, 56, 60, 42, 24, 12, 18, 54, 42, 24, 66, 12],
                                    backgroundColor: "#31D0B5",
                                    fill: false
                                },
                            ]               
                        }}
                        options={{
                          responsive:true,
                          maintainAspectRatio: false,       
                          legend: { display: false }, 
                          plugins: { datalabels: { display: true, color: "black", anchor: "center", align: "center", font: {size: 0}}},                
                          scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true,
                                    min: 0 
                                }
                              }]
                          }
                        }}
                      />
                  </div>
                </div>
                <div id="cigs" className="shadow-lg w-full py-4 px-6 bg-white rounded-md border mb-12">
                  <p className="text-2xl font-bold">
                    Nombre de cigarettes fumées par jour (en %)
                  </p>
                  <div style={{height: "450px"}}>
                    <Doughnut
                        data={{
                          labels: [
                              '1-2',
                              '2-4',
                              '4-6',
                              '6-8',
                              '8-10',
                              '+10'
                          ],
                            datasets: [
                                {
                                    data: [15,12,18,8,9,12],
                                    backgroundColor: ["#00F3D1", "#31D0B5", "#27AB95", "#10685A", "#0A4138", "#01473D"]
                                },
                            ]               
                        }}
                        options={{
                          responsive:true,
                          maintainAspectRatio: false,
                          plugins: { datalabels: { display: true, color: "black", anchor: "center", align: "center", font: {size: 30}}},
                        }}
                      />
                  </div>
                </div>
                <div id="keepers" className="shadow-lg w-full py-4 px-6 bg-white rounded-md border mb-12">
                  <p className="text-2xl font-bold">
                    Nombre d’ange gardien moyen par inscrit (en %)
                  </p>
                  <div style={{height: "450px"}}>
                    <Doughnut
                        data={{
                          labels: [
                              '1',
                              '1-3',
                              '3-5',
                              '+5'
                          ],
                            datasets: [
                                {
                                    data: [40, 32, 25, 13],
                                    backgroundColor: ["#00F3D1", "#31D0B5", "#27AB95", "#10685A", "#0A4138"]
                                },
                            ]               
                        }}
                        options={{
                          responsive:true,
                          maintainAspectRatio: false,
                          plugins: { datalabels: { display: true, color: "black", anchor: "center", align: "center", font: {size: 30}}},
                        }}
                      />
                  </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to="/SignIn" />
    }
}

export default Metrics
