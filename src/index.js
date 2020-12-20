import app from './app'

/**
 * Port where the program is set to run
 */
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
