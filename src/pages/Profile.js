import React, {Fragment, useContext, useEffect} from 'react';
import {GithubContext} from "../context/github/githubContext";
import {Link} from "react-router-dom";
import {Repos} from "../components/Repos";

export const Profile = ({match}) => {
    
    const {getUser, getRepos, loading, user, repos, login} = useContext(GithubContext)
    const urlName = match.params.name;

    useEffect(() => {
        getUser(urlName);
        getRepos(urlName);
        // eslint-disabled-next-line
    }, [])

    if (loading) {
        return <p className='text-center'>Loading...</p>
    }    
    
    const {
        name, company, avatar_url, location,
        bio, blog, html_url, followers, 
        public_repos, public_gists, following
    } = user;
    
    return (
        <Fragment>
            <Link to='/' className='btn btn-link'>To main</Link>
            
            <div className='card mb-4'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-sm-3 text-center'>
                            <img style={{
                                width: 150
                            }} 
                                 src={avatar_url} 
                                 alt={name}/>
                            <h3>{name}</h3>
                            { location && <p>Location: {location}</p>}
                        </div>
                        <div className='col'>
                            {
                                bio && <Fragment>
                                    <h3>BIO</h3>
                                    <p>{bio}</p>
                                </Fragment>
                            }
                            <a
                                rel="noopener noreferrer"
                                href={html_url} 
                                target='_blank' 
                                className='btn btn-dark'
                            >Open profile</a>
                            
                            <ul>
                                { login && <li>
                                    <strong>Username: </strong> {login}
                                </li> }
                                { company && <li>
                                    <strong>Company: </strong> {company}
                                </li> }
                                { blog && <li>
                                    <strong>Blog: </strong> {blog}
                                </li> }
                            </ul>
                            
                            <div className='badge badge-primary'>
                                Followers: {followers}
                            </div>
                            <div className='badge badge-success'>
                                Following: {following}
                            </div>
                            <div className='badge badge-info'>
                                Repos: {public_repos}
                            </div>
                            <div className='badge badge-dark'>
                                Gists: {public_gists}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Repos repos={repos}/>
        </Fragment>
    )
}